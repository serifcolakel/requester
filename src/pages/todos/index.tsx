import { TrashIcon } from 'lucide-react';

import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';

import useTodos from '@hooks/useTodos';

export default function Todos() {
  const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
    useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Todos ({todos.length})</h1>
      <ul className="mt-4 grid lg:grid-cols-3 md:grid-cols-2 gap-2 h-[50vh] overflow-y-scroll border p-2 rounded-lg shadow-sm">
        {todos.map((todo) => (
          <li
            className="flex flex-row items-center justify-center gap-x-4"
            key={todo.id}
          >
            <Input
              onChange={(e) => updateTodoTitle(todo.id, e.target.value)}
              type="text"
              value={todo.title}
            />
            <Checkbox
              checked={todo.completed}
              intent="destructive"
              onCheckedChange={toggleTodo(todo.id)}
              value={todo.id}
            />
            <TrashIcon
              className="text-red-500 cursor-pointer w-7 h-7"
              onClick={removeTodo(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
