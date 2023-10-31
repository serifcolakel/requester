import { useCallback, useEffect, useState } from 'react';

import notification from '@lib/notification';

import { get } from '@services/api';
import { BaseResponse } from '@services/types';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

/**
 * @description A hook for managing todos
 * @returns Returns the all functionality for todos
 */
export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const [loading, setLoading] = useState(false);

  const toggleTodo = (id: number) => () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    notification('Todo status updated successfully.');
    setTodos(newTodos);
  };

  const updateTodoTitle = (id: number, title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title };
      }

      return todo;
    });

    setTodos(newTodos);
  };

  const removeTodo = (id: number) => () => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    notification(`Todo ${id} removed successfully.`, 'success');
    setTodos(newTodos);
  };

  const refetch = useCallback(async () => {
    setLoading(true);
    const res = await get<BaseResponse<Todo[]>>('todos');

    setTodos(res.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    todos,
    loading,
    refetch,
    toggleTodo,
    removeTodo,
    updateTodoTitle,
  };
}
