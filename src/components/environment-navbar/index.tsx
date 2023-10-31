import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { Delete, PlusSquareIcon } from 'lucide-react';

import useEnvironments from '@hooks/useEnvironments';

export default function EnvironmentNavbar() {
  const { environments, create, remove, loading } = useEnvironments();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="flex flex-col w-4/12 py-8 bg-white lg:w-2/12 gap-y-2 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex flex-row items-center justify-between px-2 py-4 border-b-2 border-b-primary/50">
        <h1 className="text-2xl font-bold text-center">Environments</h1>
        <PlusSquareIcon className="w-6 h-6" onClick={() => create()} />
      </div>
      <section>
        {environments.map((env) => (
          <NavLink
            className={({ isActive }) =>
              clsx(
                'flex items-center flex-row justify-between gap-x-2 px-4 py-2 rounded-md',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'transition-colors duration-300 ease-in-out',
                'dark:text-gray-100',
                isActive && 'bg-gray-100 dark:bg-gray-700'
              )
            }
            key={env.id}
            to={`/environment/${env.id}`}
          >
            <p className="w-10/12 truncate">{env.name}</p>
            <Delete
              className="w-6 h-6 transition-transform duration-300 ease-in-out cursor-pointer hover:text-red-500 hover:rounded-lg hover:bg-white"
              onClick={(e) => {
                e.preventDefault();
                remove(env.id);
              }}
            />
          </NavLink>
        ))}
      </section>
    </nav>
  );
}
