import axios from 'axios';

type IsDoneToDoItem = {
  isDone: boolean;
  idItem: string;
};

export const changeToDoItemToIsDone = async ({
  idItem,
  isDone,
}: IsDoneToDoItem) => {
  await axios({
    method: 'put',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: `/todo-items/${idItem}`,
    data: {
      data: {
        isDone,
      },
    },
  });
};
