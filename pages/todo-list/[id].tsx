import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import useDebounce from '../../hooks/useDebounce';
import { useRouter } from 'next/router';
import ToDoItemsList from '../../components/ToDoItemsList';
import { useToDoListQuery } from '../../queries/useToDoListQuery';
import Filters from '../../components/Filters';
import IconButton from '../../components/IconButton';
import { IoMdArrowBack } from 'react-icons/io';
import { useFilters } from '../../hooks/useFilters';
import Modal from '../../components/Modal';
import AddToDoItemForm from '../../components/AddToDoItemForm';

export enum StatusFilter {
  ALL = 'ALL',
  DONE = 'DONE',
  ACTIVE = 'ACTIVE',
}

const SEARCH_DEBOUNCE_DELAY = 500;

const ToDoListDetails = () => {
  const { query, back } = useRouter();
  const id = query.id as string;
  const {
    orderHandler,
    priorityFilterHandler,
    searchHandler,
    searchInputValue,
    selectedFilterByPriority,
    selectedFilterByStatus,
    selectedOrder,
    statusFilterHandler,
  } = useFilters();

  const debouncedValue = useDebounce(searchInputValue, SEARCH_DEBOUNCE_DELAY);

  const { data: toDoList, isLoading } = useToDoListQuery({
    toDoListId: id,
    filterByPriority: selectedFilterByPriority,
    filterByStatus: selectedFilterByStatus,
    orderByPriority: selectedOrder,
    searchTitle: debouncedValue,
  });

  const totalItemsAmount =
    toDoList?.data?.attributes?.todo_items?.data.length ?? 0;

  const doneItemsAmount =
    toDoList?.data?.attributes?.todo_items?.data.filter(
      ({ attributes }) => attributes?.isDone === true
    ).length ?? 0;

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
        <div className="flex w-full justify-between mt-3 px-3 items-center">
          <IconButton icon={<IoMdArrowBack />} onClick={() => back()} />
          <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-emerald-50 text-emerald-500 border border-emerald-500 px-4 py-2 text-sm font-medium hover:bg-emerald-100"
          >
            New ToDo
          </button>
        </div>

        <Modal
          isOpen={isOpen}
          onCloseModal={closeModal}
          onOpenModal={openModal}
        >
          <AddToDoItemForm idList={Number(id)} onSuccess={closeModal} />
        </Modal>

        <div className="flex flex-col-reverse md:flex-row items-end">
          <Filters
            selectedFilterByPriority={selectedFilterByPriority}
            onChangeSelectedFilterByPriority={priorityFilterHandler}
            selectedOrder={selectedOrder}
            onChangeSelectedOrder={orderHandler}
            selectedFilterByStatus={selectedFilterByStatus}
            onChangeSelectedFilterByStatus={statusFilterHandler}
            searchInputValue={searchInputValue}
            onChangeSearchInputValue={searchHandler}
          />
          <div className="w-[250px] text-right mb-[28px] font-semibold mr-3">
            Done: {doneItemsAmount} / {totalItemsAmount}
          </div>
        </div>

        <ToDoItemsList isLoading={isLoading} toDoList={toDoList} />
      </div>
    </div>
  );
};

export default ToDoListDetails;
