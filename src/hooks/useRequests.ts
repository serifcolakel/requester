import { useCallback, useEffect, useState } from 'react';

import useTableColums from '@pages/environment-detail/hooks/useTableColums';

import { createCollection } from '@services/request/service';
import { Variable } from '@services/variable/types';

import useDebounce from './useDebounce';

export type UseRequests = ReturnType<typeof useRequests>;

/**
 * @description This hook is used to manage requests
 * @returns Returns the all functionality for requests
 */
export default function useRequests(environmentId: string) {
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const filterValue = useDebounce(search, 500);

  const [variables, setVariables] = useState<Variable[]>([]);

  const refetch = useCallback(async () => {
    setLoading(true);
    const res = await getAllVariables({ environmentId });

    setVariables(res.data);
    setLoading(false);
  }, [environmentId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = async (name?: string) => {
    await createVariable({
      environmentId,
      name: name || 'New Variable',
      value: '',
    });
    refetch();
  };

  const update = async ({ id, name, value }: Variable) => {
    await updateVariable(id, {
      environmentId,
      name,
      value,
    });
    refetch();
  };

  const remove = async (id: string) => {
    await deleteVariable(id);
    refetch();
  };

  const { columns } = useTableColums({ remove, update });

  return {
    variables: variables.filter(
      (variable) =>
        variable.name.toLowerCase()?.includes(filterValue.toLowerCase())
    ),
    search,
    loading,
    columns,
    setVariables,
    setSearch,
    refetch,
    create,
    update,
    remove,
  };
}
