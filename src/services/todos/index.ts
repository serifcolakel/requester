import { get } from '../api';
import { Todo } from './types';

export const getTodos = async (): Promise<Todo[]> => {
  return get<Todo[]>('/todos');
};
