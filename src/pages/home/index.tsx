import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TrashIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from '@components/form-field/InputField';
import HighlightedInput from '@components/HighlightedInput';
import { Button } from '@components/ui/button';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';

import useEnvironments from '@hooks/useEnvironments';
import useTodos from '@hooks/useTodos';

type FormElementBaseProps = {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'link';
};

type FormElementProps = FormElementBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
        as: 'button';
      })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        as: 'a';
      })
    | (React.InputHTMLAttributes<HTMLInputElement> & {
        as: 'input';
      })
    | (React.SelectHTMLAttributes<HTMLSelectElement> & {
        as: 'select';
      })
    | (React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        as: 'textarea';
      })
  );

export function FormElement({ variant, ...props }: FormElementProps) {
  switch (props.as) {
    case 'button':
      return (
        <button type="button" {...props}>
          {props.children}
        </button>
      );
    case 'a':
      return <a {...props}>{props.children}</a>;
    case 'input':
      return <input {...props} />;
    case 'select':
      return <select {...props}>{props.children}</select>;
    case 'textarea':
      return <textarea {...props} />;
    default:
      return null;
  }
}

export function Usage() {
  return (
    <main>
      <FormElement as="button" variant="primary">
        Submit
      </FormElement>

      <FormElement as="a" href="https://example.com" variant="secondary">
        Example
      </FormElement>
      <FormElement as="input" type="text" variant="outline" />
      <FormElement as="select" variant="link">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </FormElement>
      <FormElement as="textarea" variant="primary" />
    </main>
  );
}

const defaultValues = {
  test: '',
  nestedValue: '',
  agree: false,
};

const schema = z.object({
  test: z.string().min(3, 'Min 3'),
  nestedValue: z.string().min(3, 'Min 3'),
});

type FormValues = z.infer<typeof schema>;

export default function Home() {
  const {
    environments,
    addEnvironment,
    removeEnvironment,
    updateEnvironmentValue,
    updateEnvironmentVariableName,
  } = useEnvironments();

  const methods = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { loading, todos, toggleTodo, removeTodo, updateTodoTitle } =
    useTodos();

  if (loading) {
    return <div>Loading...</div>;
  }

  const options = environments.map(({ id, ...rest }) => ({ ...rest }));

  return (
    <div className="flex flex-col p-4 space-y-4">
      <FormProvider {...methods}>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={methods.handleSubmit((data) => window.console.log(data))}
        >
          <InputField<FormValues> label="21412414" name="test" />
          <InputField<FormValues> label="124124" name="nestedValue" />
          <InputField<FormValues> label="124124" name="nestedValue" />
          <HighlightedInput
            getFormattedValue={(l) => {
              window.console.log(l);
            }}
            initialValue="https://{{BASE_URL}}/api/v1/{{ENDPOINT}}"
            label="Test"
            options={options}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
      <div className="w-1/2 p-4" />
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
              value={env.name}
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
