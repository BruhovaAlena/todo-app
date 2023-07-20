import React from 'react';
import { TodoListEntityResponseCollection } from '../strapi/types';
import ToDoListCard from './ToDoListCard';
import { useRouter } from 'next/router';

type ToDoListsProps = {
  toDoLists: TodoListEntityResponseCollection | undefined;
  isLoading: boolean;
};

const ToDoLists = ({ isLoading, toDoLists }: ToDoListsProps) => {
  const router = useRouter();
  const hasData = Boolean(toDoLists?.data.length);

  if (isLoading) {
    return <p className="text-xl font-semibold">Loading...</p>;
  }

  if (hasData) {
    return (
      <div className="grid gap-3 w-full px-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-100 pb-6">
        {toDoLists?.data.map(({ id, attributes }) => {
          if (attributes && id) {
            return (
              <ToDoListCard
                createdAt={attributes.createdAt}
                title={attributes.title}
                key={id}
                onClick={() => router.push(`/todo-list/${id}`)}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }

  return <p className="text-xl font-semibold">Add Your First ToDo List</p>;
};

export default ToDoLists;
