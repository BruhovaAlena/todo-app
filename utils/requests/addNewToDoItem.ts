import axios from 'axios';
import { format } from 'date-fns';

type AddNewToDoItem = {
  title: string;
  description: string;
  date: Date;
  priority: string;
  connect: number[];
};

export const addNewToDoItem = async ({
  title,
  connect,
  description,
  priority,
  date,
}: AddNewToDoItem) => {
  await axios({
    method: 'post',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: '/todo-items',
    data: {
      data: {
        time: format(date, 'yyyy-MM-dd'),
        title,
        description,
        priority,
        Todo_list: {
          connect,
        },
      },
    },
  });
};
