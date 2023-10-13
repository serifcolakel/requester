import { useEffect, useState } from 'react';
import { getTodos } from './services/todos';

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

    setTodos(newTodos);
  };

  const getTodoList = async () => {
    setLoading(true);
    const list = await getTodos();

    setTodos(list);
    setLoading(false);
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return {
    todos,
    loading,
    toggleTodo,
    removeTodo,
    updateTodoTitle,
  };
}
