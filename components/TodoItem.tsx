import React from 'react';
import Button from './Button';
import { useDeleteToDoItemMutation } from '../mutations/useDeleteToDoItemMutation';
import { useEditToDoItemMutation } from '../mutations/useEditToDoItemMutation';
import { Enum_Todoitem_Priority } from '../strapi/types';
import { format } from 'date-fns';
import PriorityLabel from './PriorityLabel';

type ToDoItemProps = {
  title: string;
  description: string;
  priority: Enum_Todoitem_Priority;
  isDone: boolean;
  id: string;
  date: string;
};

const TodoItem = ({
  description,
  isDone,
  priority,
  title,
  id,
  date,
}: ToDoItemProps) => {
  const mutation = useDeleteToDoItemMutation(id);
  const editMutation = useEditToDoItemMutation(id);

  const deleteToDoItem = () => {
    mutation.mutate({ idItem: id });
  };

  const editToDoItem = () => {
    editMutation.mutate({ idItem: id, isDone: true });
  };

  const formatDate = format(new Date(date), 'dd. MMMM yyyy');

  return (
    <div className="card card-compact w-full shadow-xl bg-white rounded-md">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <h2 className="card-title text-black max-w-[240px]  break-all ">
            {title}
          </h2>

          <PriorityLabel priority={priority} />
        </div>
        <p className="text-black">{description}</p>
        <div className="card-actions justify-end mt-2 items-center">
          <p className="font-semibold text-xs">{formatDate}</p>
          <Button
            className=" w-20 bg-emerald-50 text-emerald-500 border border-emerald-500"
            onClick={editToDoItem}
            title="Done"
            disabled={isDone}
          />
          <Button
            className="bg-red-50 w-20 text-red-500 border border-red-500"
            onClick={deleteToDoItem}
            title="Delete"
            disabled={isDone}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
