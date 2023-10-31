import { Link } from 'react-router-dom';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';

import paths from '@routes/paths';

import useEnvironments from '@hooks/useEnvironments';

import TypeGenerator from './TypeGenerator';

// const defaultValues = {
//   test: '',
//   nestedValue: '',
//   agree: false,
// };

// const schema = z.object({
//   test: z.string().min(3, 'Min 3'),
//   nestedValue: z.string().min(3, 'Min 3'),
// });

export default function Home() {
  const { environments, create, loading, remove, update } = useEnvironments();

  // const methods = useForm({
  //   mode: 'onChange',
  //   defaultValues,
  //   resolver: zodResolver(schema),
  // });

  // const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
  //   useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  // const options = environments.map(({ id, ...rest }) => ({ ...rest }));

  return (
    <div className="flex flex-col p-4 space-y-4">
      <TypeGenerator
        jsonObject={`${JSON.stringify(
          {
            message: 'Record required but not found.',
            data: {
              code: 'P2025',
              test: 'test',
              nestedValue: 'test',
              agree: false,
              test2: [
                {
                  test: 'test',
                  nestedValue: 'test',
                  agree: false,
                },
              ],
            },
            success: false,
          },
          null,
          2
        )}`}
      />
      <Link to={paths.environment}>Environment</Link>
      <div className="w-1/2 p-4" />
      <h1 className="text-2xl font-bold text-center">
        Environments ({environments.length})
      </h1>
      <Button onClick={() => create()}>Add Environment</Button>
      <div className="space-y-2">
        {environments.map((env) => (
          <div className="flex flex-row gap-x-4" key={env.id}>
            <Input
              onBlur={(e) =>
                update({
                  id: env.id,
                  name: e.target.value,
                })
              }
              placeholder="Variable Name"
              type="text"
              value={env.name}
            />
            <Button onClick={() => remove(env.id)} variant="destructive">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
