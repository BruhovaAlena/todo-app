import React from 'react';
import TodoItem from './TodoItem';
import { TodoListEntityResponse } from '../strapi/types';

type ToDoItemsListProps = {
  toDoList: TodoListEntityResponse | undefined;
  isLoading: boolean;
};

const ToDoItemsList = ({ toDoList, isLoading }: ToDoItemsListProps) => {
  const hasData = Boolean(toDoList?.data?.attributes?.todo_items?.data.length);

  if (isLoading) {
    return <p className="text-xl font-semibold">Loading...</p>;
  }

  if (hasData) {
    return (
      <div className="grid gap-3 px-3 w-full sm:grid-cols-1 sm:mb-7 md:grid-cols-2 lg:grid-cols-3 pb-6 bg-slate-100">
        {toDoList?.data?.attributes?.todo_items?.data.map(
          ({ attributes, id }) => {
            if (attributes && id) {
              return (
                <TodoItem
                  description={attributes.description}
                  isDone={attributes.isDone}
                  priority={attributes.priority}
                  title={attributes.title}
                  key={id}
                  id={id}
                  date={attributes.time}
                />
              );
            }
            return null;
          }
        )}
      </div>
    );
  }

  return (
    <p className="text-xl font-semibold">List is empty. Add your first ToDo.</p>
  );
};

export default ToDoItemsList;
