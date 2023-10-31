import { FormProvider } from 'react-hook-form';

import InputField from '@components/form-field/InputField';
import { Button } from '@components/ui/button';

import { LoginRequest } from '@services/auth/types';

import useHandle from './hooks/useHandle';

export default function Login() {
  const { form, onLoginSubmit } = useHandle();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-primary/30 to-primary/40">
      <FormProvider {...form}>
        <form
          noValidate
          className="flex flex-col w-3/4 p-4 border rounded-md gap-y-4 bg-primary-foreground lg:w-1/3 md:w-1/2"
          name="login"
          onSubmit={onLoginSubmit}
        >
          <InputField<LoginRequest> label="Email" name="email" type="email" />
          <InputField<LoginRequest>
            label="Password"
            name="password"
            type="password"
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </div>
  );
}
