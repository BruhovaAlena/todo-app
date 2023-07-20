import axios from 'axios';
import { TodoListEntityResponseCollection } from '../../strapi/types';

export const getAllToDoLists = async () => {
  const response = await axios<TodoListEntityResponseCollection>({
    method: 'get',
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    url: `/todo-lists`,
  });
  return response.data;
};
