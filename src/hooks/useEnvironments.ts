import { useCallback, useEffect, useState } from 'react';

import { environmentsAtom } from '@store/atoms';
import { useCustomAtom } from '@store/index';

import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironments,
  updateEnvironment,
} from '@services/environment/service';
import { Environment } from '@services/environment/types';

/**
 * @description This hook is used to manage environments with global state
 * @returns Returns the all functionality for environments
 */
export default function useEnvironments() {
  const [loading, setLoading] = useState<boolean>(false);

  const [environments, setEnvironments] = useCustomAtom(environmentsAtom);

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

  const update = async (environment: Environment) => {
    await updateEnvironment(environment.id, { name: environment.name });
    refetch(true);
  };

  const remove = async (id: string) => {
    await deleteEnvironment(id);
    refetch(true);
  };

  return {
    environments,
    loading,
    refetch,
    create,
    update,
    remove,
  };
}
