import { useCallback, useEffect, useState } from 'react';

import useTableColums from '@pages/environment-detail/hooks/useTableColums';

import {
  createVariable,
  deleteVariable,
  getAllVariables,
  updateVariable,
} from '@services/variable/service';
import { Variable } from '@services/variable/types';

import useDebounce from './useDebounce';

export type UseVariable = ReturnType<typeof useVariable>;

/**
 * @description This hook is used to manage variables
 * @returns Returns the all functionality for variables
 */
export default function useVariable(environmentId: string) {
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

  const update = async (variable: Variable) => {
    await updateVariable(variable.id, {
      environmentId,
      name: variable.name,
      value: variable.value,
    });
    refetch();
  };

  const remove = async (id: string) => {
    await deleteVariable(id);
    refetch();
  };

  const { columns } = useTableColums({ remove, update });

  return {
    variables: variables.filter((variable) =>
      variable.name.toLowerCase().includes(filterValue.toLowerCase())
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
