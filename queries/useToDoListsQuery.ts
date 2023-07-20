import { useQuery } from '@tanstack/react-query';
import { getAllToDoLists } from '../utils/requests';

export const useToDoListsQuery = () =>
  useQuery({
    queryKey: ['toDoLists'],
    queryFn: () => getAllToDoLists(),
  });
