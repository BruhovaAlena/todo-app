import { useQuery } from '@tanstack/react-query';
import { getToDoList } from '../utils/requests';
import { Priority } from '../components/AddToDoItemForm';
import { StatusFilter } from '../pages/todo-list/[id]';
import { Order } from '../components/Filters';

type UseToDoListQuery = {
  toDoListId: string;
  searchTitle: string;
  orderByPriority: Order;
  filterByPriority: Priority;
  filterByStatus: StatusFilter;
};

export const useToDoListQuery = ({
  toDoListId,
  filterByPriority,
  filterByStatus,
  orderByPriority,
  searchTitle,
}: UseToDoListQuery) =>
  useQuery({
    queryKey: [
      'toDoItems',
      toDoListId,
      filterByStatus,
      filterByPriority,
      orderByPriority,
      searchTitle,
    ],
    queryFn: () =>
      getToDoList({
        toDoListId,
        filterByStatus,
        filterByPriority,
        orderByPriority,
        searchTitle,
      }),
  });
