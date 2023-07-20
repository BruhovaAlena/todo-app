import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewList } from '../utils/requests';
import { errorToast } from '../toasts/toasts';

export const useAddNewListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addNewList,
    onSuccess: (data) => {
      queryClient.setQueryData(['toDoLists'], data);
      queryClient.invalidateQueries({ queryKey: ['toDoLists'] });
    },
    onError: () => {
      errorToast();
    },
  });
};
