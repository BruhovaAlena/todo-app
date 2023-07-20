import React from 'react';
import { format } from 'date-fns';

type ToDoListCardProps = {
  title: string;
  onClick: () => void;
  createdAt: string;
};

const ToDoListCard = ({ title, onClick, createdAt }: ToDoListCardProps) => {
  const formatDate = format(new Date(createdAt), 'dd. MMMM yyyy');
  return (
    <div className="card card-compact w-full  shadow-xl bg-white rounded-md">
      <div className="card-body max-w-full break-all">
        <h2 className="card-title text-black">{title}</h2>

        <div className="card-actions justify-end items-center">
          <p className="">Created at {formatDate}</p>
          <button
            className="btn btn-sm  bg-emerald-50 text-emerald-500 border border-emerald-500"
            onClick={onClick}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoListCard;
