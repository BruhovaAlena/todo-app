import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewToDoItem } from '../utils/requests';
import { errorToast } from '../toasts';

export const useAddNewToDoItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewToDoItem,
    onSuccess: (data) => {
      queryClient.setQueryData(['toDoItem'], data);
      queryClient.invalidateQueries({ queryKey: ['toDoItems'] });
    },
    onError: () => {
      errorToast();
    },
  });
};
