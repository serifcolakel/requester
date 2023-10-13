import { useEffect, useState } from 'react';
import notification from '@utils/notification';
import { getTodos } from '@services/todos';

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

    notification('Todo removed successfully.', 'error');
    setTodos(newTodos);
  };

  const refetch = async () => {
    setLoading(true);
    const list = await getTodos();

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
  };

  useEffect(() => {
    refetch();
  }, []);

  return {
    todos,
    loading,
    refetch,
    toggleTodo,
    removeTodo,
    updateTodoTitle,
  };
}
