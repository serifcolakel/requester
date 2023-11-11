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

import { UseVariable } from '@hooks/useVariable';

import { Variable } from '@services/variable/types';

type Props = Pick<UseVariable, 'update'> & {
  variable: Variable;
};

const schema = z.object({
  name: z.string(),
  value: z.string(),
});

type SubmitEvent = z.infer<typeof schema>;

export default function Update({ update, variable }: Props) {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      name: variable.name,
      value: variable.value,
    },
    resolver: zodResolver(schema),
  });

  const onLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit(async (formValues) => {
      await update({
        ...variable,
        name: formValues.name,
        value: formValues.value,
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
            <DialogTitle>Edit Variable</DialogTitle>
            <DialogDescription>
              Make changes to your variable here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form
              noValidate
              className="flex flex-col gap-y-4"
              name="login"
              onSubmit={onLoginSubmit}
            >
              <InputField<SubmitEvent> label="Name" name="name" />
              <InputField<SubmitEvent> label="Value" name="value" />
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
