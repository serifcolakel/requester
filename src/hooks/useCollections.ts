import { useCallback, useEffect, useState } from 'react';

import { collectionsAtom } from '@store/atoms';
import { useCustomAtom } from '@store/index';

import {
  createCollection,
  deleteCollection,
  getAllCollections,
  updateCollection,
} from '@services/collection/service';
import { Collection } from '@services/collection/types';

import useDebounce from './useDebounce';

/**
 * @description This hook is used to manage collections with global state
 * @returns Returns the all functionality for collections
 */
export default function useCollections() {
  const [loading, setLoading] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  const filterValue = useDebounce(search, 500);

  const [collections, setCollections] = useCustomAtom(collectionsAtom);

  const refetch = useCallback(
    async (forceFetch = false) => {
      if (collections.length && !forceFetch) return;

      setLoading(true);
      const res = await getAllCollections();

      setCollections(res.data);
      setLoading(false);
    },
    [collections.length, setCollections]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const create = async (name?: string) => {
    await createCollection({
      name: name || 'New Collection',
    });
    refetch(true);
  };

  const update = async ({ id, name }: Pick<Collection, 'id' | 'name'>) => {
    await updateCollection(id, { name });
    refetch(true);
  };

  const remove = async (id: string) => {
    await deleteCollection(id);
    refetch(true);
  };

  const selectCollection = useCallback(
    (id: string) => {
      const collection = collections.find((c) => c.id === id);

      return collection;
    },
    [collections]
  );

  return {
    collections: collections.filter((collection) =>
      collection.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    search,
    loading,
    selectCollection,
    setSearch,
    refetch,
    create,
    update,
    remove,
  };
}
