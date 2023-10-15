import { Button } from '@components/ui/button';
import useEnvironments from '@hooks/useEnvironments';
import useTodos from '@hooks/useTodos';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { AiFillDelete } from 'react-icons/ai';
import CustomInput from '@components/HiglightedInput';

export default function Home() {
  const {
    environments,
    addEnvironment,
    removeEnvironment,
    updateEnvironmentValue,
    updateEnvironmentVariableName,
  } = useEnvironments();

  const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
    useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <CustomInput />
      <h1 className="text-2xl font-bold text-center">
        Environments ({environments.length})
      </h1>
      <Button onClick={addEnvironment}>Add Environment</Button>
      <div className="space-y-2">
        {environments.map((env) => (
          <div className="flex flex-row gap-x-4" key={env.id}>
            <Input
              onChange={(e) =>
                updateEnvironmentVariableName(env, e.target.value)
              }
              placeholder="Variable Name"
              type="text"
              value={env.veriable}
            />
            <Input
              onChange={(e) => updateEnvironmentValue(env, e.target.value)}
              placeholder="Value"
              type="text"
              value={env.value}
            />
            <Button
              onClick={() => removeEnvironment(env)}
              variant="destructive"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      {/* <Link to={paths.login}>Login</Link>
      <Link to={paths.register}>Register</Link> */}
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
              onCheckedChange={toggleTodo(todo.id)}
              value={todo.id}
            />
            <AiFillDelete
              className="text-red-500 cursor-pointer w-7 h-7"
              onClick={removeTodo(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
