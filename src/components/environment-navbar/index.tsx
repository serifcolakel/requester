import { BsThreeDots } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { CheckCircle2, Plus, Trash2 } from 'lucide-react';

import ListWrapper from '@components/list-wrapper';
import { Input } from '@components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';

import paths from '@routes/paths';

import useEnvironments from '@hooks/useEnvironments';

import Update from './forms/Update';

export default function EnvironmentNavbar() {
  const {
    environments,
    create,
    remove,
    search,
    update,
    setSearch,
    environment,
    loading,
    setEnvironment,
  } = useEnvironments();

  return (
    <nav className="flex flex-col w-4/12 py-8 bg-gray-50 gap-y-2 dark:bg-gray-800 dark:border-gray-600">
      <div className="flex flex-row items-center justify-between px-2 py-4 gap-x-2">
        <TooltipProvider key="new environment">
          <Tooltip>
            <TooltipTrigger>
              <Plus className="w-6 h-6" onClick={() => create()} />
            </TooltipTrigger>
            <TooltipContent>Add new environment</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Input
          className="h-8"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          value={search}
        />
        <BsThreeDots className="w-6 h-6" />
      </div>
      <ListWrapper isEmpty={environments.length === 0} loading={loading}>
        <section className="px-1 space-y-1">
          {environments.map((env) => (
            <NavLink
              className={({ isActive }) =>
                clsx(
                  'group flex items-center flex-row justify-between gap-x-2 px-4 py-2 rounded-md z-0',
                  'hover:bg-gray-100 dark:hover:bg-gray-700',
                  'transition-colors duration-300 ease-in-out',
                  'dark:text-gray-100 text-muted-foreground',
                  isActive && 'bg-gray-100 dark:bg-gray-700 '
                )
              }
              key={env.id}
              to={`${paths.environmentDetail.replace(':id', env.id)}`}
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <Update environment={env} update={update} />
                  ) : null}
                  <p className="w-10/12 text-sm truncate group-hover:text-gray-800">
                    {env.name}
                  </p>
                  {environment?.id === env.id ? (
                    <CheckCircle2 className="w-5 h-5 text-white fill-gray-500 hover:fill-white hover:text-gray-500" />
                  ) : (
                    <CheckCircle2
                      className={clsx(
                        'hidden w-5 h-5 text-gray-500',
                        'hover:fill-gray-500',
                        'group-hover:block group-hover:text-gray-500 group-hover:hover:text-white'
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEnvironment(env);
                      }}
                    />
                  )}
                  {environment?.id === env.id ? null : (
                    <Trash2
                      className="w-5 h-5 text-gray-500 hover:text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        remove(env.id);
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </section>
      </ListWrapper>
    </nav>
  );
}
