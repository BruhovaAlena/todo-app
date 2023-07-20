import React from 'react';
import { Priority } from './AddToDoItemForm';
import { StatusFilter } from '../pages/todo-list/[id]';

type FiltersProps = {
  selectedFilterByPriority: Priority | undefined;
  onChangeSelectedFilterByPriority: (value: Priority) => void;
  selectedOrder: string;
  onChangeSelectedOrder: (value: Order) => void;
  selectedFilterByStatus: StatusFilter | undefined;
  onChangeSelectedFilterByStatus: (value: StatusFilter) => void;
  searchInputValue: string;
  onChangeSearchInputValue: (value: string) => void;
};

export enum Order {
  UPCOMING = 'UPCOMING',
  ASC = 'asc',
  DESC = 'desc',
}

const Filters = ({
  selectedFilterByPriority,
  onChangeSelectedFilterByPriority,
  onChangeSelectedOrder,
  selectedOrder,
  onChangeSelectedFilterByStatus,
  selectedFilterByStatus,
  onChangeSearchInputValue,
  searchInputValue,
}: FiltersProps) => {
  return (
    <div className="flex flex-row w-full gap-3 flex-wrap items-center bg-slate-100 px-3 py-4 rounded-md">
      <div className="form-control w-full md:w-[150px]">
        <label className="label font-semibold">
          <span className="label-text">Priority</span>
        </label>
        <select
          className="select select-bordered"
          placeholder="Priority"
          defaultValue={undefined}
          value={selectedFilterByPriority}
          onChange={(e) =>
            onChangeSelectedFilterByPriority(e.target.value as Priority)
          }
        >
          <option value={Priority.ALL}>All</option>
          <option value={Priority.HIGH}>High</option>
          <option value={Priority.MEDIUM}>Medium</option>
          <option value={Priority.LOW}>Low</option>
        </select>
      </div>

      <div className="form-control w-full md:w-[150px]">
        <label className="label font-semibold">
          <span className="label-text">Order</span>
        </label>
        <select
          placeholder="Order"
          className="select select-bordered"
          value={selectedOrder}
          onChange={(e) => onChangeSelectedOrder(e.target.value as Order)}
        >
          <option value={Order.UPCOMING}>Upcoming</option>
          <option value={Order.DESC}>Desc</option>
          <option value={Order.ASC}>Asc</option>
        </select>
      </div>

      <div className="form-control w-full md:w-[150px]">
        <label className="label font-semibold">
          <span className="label-text">Filter</span>
        </label>
        <select
          placeholder="Filter"
          className="select select-bordered"
          value={selectedFilterByStatus}
          onChange={(e) =>
            onChangeSelectedFilterByStatus(e.target.value as StatusFilter)
          }
        >
          <option value={StatusFilter.ALL}>All</option>
          <option value={StatusFilter.ACTIVE}>Active</option>
          <option value={StatusFilter.DONE}>Done</option>
        </select>
      </div>

      <div className="form-control w-full md:w-[250px]">
        <label className="label font-semibold">
          <span className="label-text">Search</span>
        </label>
        <input
          value={searchInputValue}
          onChange={(e) => onChangeSearchInputValue(e.target.value)}
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
        />
      </div>
    </div>
  );
};

export default Filters;
