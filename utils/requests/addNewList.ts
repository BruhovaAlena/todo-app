import axios from 'axios';

type AddNewList = {
  title: string;
};

export const addNewList = async ({ title }: AddNewList) => {
  await axios({
    method: 'post',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: '/todo-lists',
    data: {
      data: {
        title,
      },
    },
  });
};
