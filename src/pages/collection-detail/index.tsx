import { FormProvider } from 'react-hook-form';
import { BiCollection } from 'react-icons/bi';
import { Save } from 'lucide-react';

import EmptyState from '@components/empty-state';
import InputField from '@components/form-field/InputField';
import { Button } from '@components/ui/button';

import useDetailAction, { SubmitEvent } from './hooks/useDetailAction';

export default function CollectionDetail() {
  const { form, hasChanges, onLoginSubmit } = useDetailAction();

  return (
    <div className="w-full h-full p-4 pt-12">
      <div className="w-full p-4 space-y-4 bg-white">
        <FormProvider {...form}>
          <div className="grid gap-4 py-4">
            <form
              noValidate
              className="flex flex-row items-end justify-between w-full gap-x-4"
              name="login"
              onSubmit={onLoginSubmit}
            >
              <InputField<SubmitEvent> label="Collection Name" name="name" />
              <Button className="w-1/4" disabled={!hasChanges} type="submit">
                <Save className="w-5 h-5 mr-4 text-white" />
                Save changes
              </Button>
            </form>
          </div>
        </FormProvider>
      </div>
      <EmptyState
        description="Select best name for your collection."
        icon={<BiCollection className="inline-block w-16 h-16 text-gray-500" />}
        title="You can update your collection name."
      />
    </div>
  );
}
