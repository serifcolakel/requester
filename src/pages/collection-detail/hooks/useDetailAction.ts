import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import useCollections from '@hooks/useCollections';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type SubmitEvent = z.infer<typeof schema>;

export default function useDetailAction() {
  const { id } = useParams<{ id: string }>();

  const { selectCollection, update } = useCollections();

  const collection = selectCollection(id || '');

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: collection?.name || '',
    },
    resolver: zodResolver(schema),
  });

  const { setValue } = form;

  useEffect(() => {
    setValue('name', collection?.name || '');
  }, [collection, setValue]);

  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(async (formValues) => {
      await update({
        name: formValues.name,
        id: collection?.id || '',
      });
    })();
  };

  const hasChanges = form.formState.isDirty;

  return {
    form,
    hasChanges,
    onLoginSubmit,
  };
}
