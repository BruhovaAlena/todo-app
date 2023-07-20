import qs from 'qs';
import { Priority } from '../../components/AddToDoItemForm';
import { Order } from '../../components/Filters';
import { StatusFilter } from '../../pages/todo-list/[id]';
import axios from 'axios';
import { TodoListEntityResponse } from '../../strapi/types';

const getPriorityFilterValue = (priority: Priority) => {
  if (priority === Priority.LOW) {
    return 'priority1';
  }
  if (priority === Priority.MEDIUM) {
    return 'priority2';
  }

  return 'priority3';
};

const getOrderValue = (order: Order) => {
  if (order === Order.UPCOMING) {
    return 'time:asc';
  }
  if (order === Order.DESC) {
    return 'priority:desc';
  }
  return 'priority:asc';
};

type GetParams = {
  searchTitle: string;
  orderByPriority: Order;
  filterByPriority: Priority;
  filterByStatus: StatusFilter;
};

const getParams = ({
  searchTitle,
  filterByStatus,
  filterByPriority,
  orderByPriority,
}: GetParams): string => {
  return qs.stringify(
    {
      populate: {
        todo_items: {
          sort: [getOrderValue(orderByPriority)],
          filters: {
            $and: [
              ...(searchTitle
                ? [
                    {
                      title: {
                        $containsi: searchTitle,
                      },
                    },
                  ]
                : []),
              ...(filterByPriority !== Priority.ALL
                ? [
                    {
                      priority: {
                        $eq: getPriorityFilterValue(filterByPriority),
                      },
                    },
                  ]
                : []),

              ...(filterByStatus !== 'ALL'
                ? [
                    {
                      isDone: {
                        $eq: filterByStatus === 'DONE' ? true : false,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      },
    },
    { encode: false }
  );
};

type GetToDoList = {
  toDoListId: string;
  searchTitle: string;
  orderByPriority: Order;
  filterByPriority: Priority;
  filterByStatus: StatusFilter;
};

export const getToDoList = async ({
  toDoListId,
  filterByStatus,
  filterByPriority,
  orderByPriority,
  searchTitle,
}: GetToDoList) => {
  const response = await axios<TodoListEntityResponse>({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: `/todo-lists/${toDoListId}?${getParams({
      searchTitle,
      filterByPriority,
      filterByStatus,
      orderByPriority,
    })}`,
  });
  return response.data;
};
