import axios from 'axios';

type DeleteToDoItem = {
  idItem: string;
};

export const deleteToDoItem = async ({ idItem }: DeleteToDoItem) => {
  await axios({
    method: 'delete',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: `/todo-items/${idItem}`,
  });
};
