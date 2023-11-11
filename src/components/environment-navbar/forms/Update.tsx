import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import InputField from '@components/form-field/InputField';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';

import { UseEnvironments } from '@hooks/useEnvironments';

import { Environment } from '@services/environment/types';

type Props = Pick<UseEnvironments, 'update'> & {
  environment: Environment;
};

const schema = z.object({
  name: z.string().min(1, 'Please enter a name'),
});

type SubmitEvent = z.infer<typeof schema>;

export default function Update({ update, environment }: Props) {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: environment.name,
    },
    resolver: zodResolver(schema),
  });

  const { setValue } = form;

  useEffect(() => {
    setValue('name', environment.name);
  }, [environment, setValue]);

  const handleSave = () => {
    form.handleSubmit(async (formValues) => {
      await update({
        id: environment.id,
        name: formValues.name,
      });
    })();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiEdit className="w-5 h-5 mx-auto text-gray-600 transition-colors duration-300 ease-in-out cursor-pointer hover:text-gray-900" />
      </DialogTrigger>
      <FormProvider {...form}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="pb-4">Edit Environment Name</DialogTitle>
            <DialogDescription>
              Make changes to your Environment here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <InputField<SubmitEvent> label="Name" name="name" />
            <DialogFooter>
              <Button onClick={handleSave} type="button">
                Save changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
