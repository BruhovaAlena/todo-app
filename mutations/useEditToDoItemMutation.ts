import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeToDoItemToIsDone } from '../utils/requests';
import { errorToast } from '../toasts';

export const useEditToDoItemMutation = (idItem: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeToDoItemToIsDone,
    onSuccess: (data) => {
      queryClient.setQueryData(['toDoItem', idItem], data);
      queryClient.invalidateQueries({ queryKey: ['toDoItems'] });
    },
    onError: () => {
      errorToast();
    },
  });
};
