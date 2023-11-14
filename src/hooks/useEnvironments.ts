import { useCallback, useEffect, useState } from 'react';

import { environmentsAtom, selectedEnvironmentAtom } from '@store/atoms';
import { useCustomAtom } from '@store/index';

import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
  updateEnvironment,
} from '@services/environment/service';
import { Environment } from '@services/environment/types';

import useDebounce from './useDebounce';

export type UseEnvironments = ReturnType<typeof useEnvironments>;

/**
 * @description This hook is used to manage environments with global state
 * @returns Returns the all functionality for environments
 */
export default function useEnvironments() {
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const filterValue = useDebounce(search, 500);

  const [environments, setEnvironments] = useCustomAtom(environmentsAtom);

  const [environment, setEnvironment] = useCustomAtom(selectedEnvironmentAtom);

  const refetch = useCallback(
    async (forceFetch = false) => {
      if (environments.length && !forceFetch) return;

      setLoading(true);
      const res = await getAllEnvironments();

      setEnvironments(res.data);
      setLoading(false);
    },
    [environments.length, setEnvironments]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = async (name?: string) => {
    await createEnvironment({
      name: name || 'New Environment',
    });
    refetch(true);
  };

  const update = async ({ id, name }: Environment) => {
    await updateEnvironment(id, { name });
    refetch(true);
  };

  const remove = async (id: string) => {
    await deleteEnvironment(id);
    refetch(true);
  };

  return {
    environments: environments.filter((env) =>
      env.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    search,
    loading,
    environment,
    setEnvironment,
    setSearch,
    refetch,
    create,
    update,
    remove,
  };
}
