import { useState } from 'react';
import { Priority } from '../components/AddToDoItemForm';
import { StatusFilter } from '../pages/todo-list/[id]';
import { Order } from '../components/Filters';

export const useFilters = () => {
  const [selectedFilterByPriority, setSelectedFilterByPriority] =
    useState<Priority>(Priority.ALL);
  const [selectedFilterByStatus, setSelectedFilterByStatus] =
    useState<StatusFilter>(StatusFilter.ALL);
  const [selectedOrder, setSelectedOrder] = useState<Order>(Order.UPCOMING);
  const [searchInputValue, setSearchInputValue] = useState('');

  const priorityFilterHandler = (value: Priority) =>
    setSelectedFilterByPriority(value);

  const orderHandler = (value: Order) => setSelectedOrder(value);

  const statusFilterHandler = (value: StatusFilter) =>
    setSelectedFilterByStatus(value);

  const searchHandler = (value: string) => setSearchInputValue(value);

  return {
    selectedFilterByPriority,
    selectedFilterByStatus,
    selectedOrder,
    searchInputValue,
    priorityFilterHandler,
    orderHandler,
    statusFilterHandler,
    searchHandler,
  };
};
