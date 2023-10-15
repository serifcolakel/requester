import { useCallback, useEffect, useState } from 'react';
import { todoServices } from '@services/todos';
import notification from '@lib/notification';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

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
    const { request } = todoServices.getAll<Todo[]>();

    const list = await request;

    if (!list.length) {
      notification('Todo list is empty.', 'warning');
      setLoading(false);

      return;
    }

    notification(
      `Todo list loaded successfully. ${list.length} items found.`,
      'success'
    );

    setTodos(list);
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
