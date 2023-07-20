import type { NextPage } from 'next';
import { useToDoListsQuery } from '../queries/useToDoListsQuery';
import ToDoLists from '../components/ToDoLists';
import AddListForm from '../components/AddListForm';
import { useState } from 'react';
import Modal from '../components/Modal';
import Image from 'next/image';
import todoImage from '../images/todo.png';

const Home: NextPage = () => {
  const { data: todoLists, isLoading } = useToDoListsQuery();

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-col gap-6 items-center w-full max-w-7xl bg-slate-100">
        <div className="flex gap-3 w-full items-center justify-center px-4 pt-3">
          <Image
            src={todoImage}
            width={100}
            height={100}
            alt="Picture of to do"
          />
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-emerald-50 text-emerald-500 border border-emerald-500 px-4 py-2 text-sm font-medium  hover:bg-emerald-100"
          >
            New ToDo List
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onCloseModal={closeModal}
          onOpenModal={openModal}
        >
          <AddListForm onSuccess={closeModal} />
        </Modal>

        <ToDoLists isLoading={isLoading} toDoLists={todoLists} />
      </div>
    </div>
  );
};

export default Home;
