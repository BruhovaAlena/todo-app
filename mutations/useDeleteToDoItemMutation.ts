import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteToDoItem } from '../utils/requests';
import { errorToast } from '../toasts';

export const useDeleteToDoItemMutation = (idItem: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteToDoItem,
    onSuccess: (data) => {
      queryClient.setQueryData(['toDoItem', idItem], data);
      queryClient.invalidateQueries({ queryKey: ['toDoItems'] });
    },
    onError: () => {
      errorToast();
    },
  });
};
