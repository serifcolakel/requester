import { FormProvider } from 'react-hook-form';

import InputField from '@components/form-field/InputField';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';

import { Logo } from '@assets/Icons';

import { LoginRequest } from '@services/auth/types';

import useHandle from './hooks/useHandle';

export default function Login() {
  const { form, onLoginSubmit } = useHandle();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-y-4 bg-gradient-to-r from-primary/10 to-primary/20">
      <main className="flex flex-col items-center justify-center w-full p-6 border rounded-md gap-y-4 bg-primary-foreground lg:w-1/3 md:w-1/2">
        <Logo className="p-2 text-white rounded-full bg-primary" size={60} />
        <Label className="text-2xl font-semibold text-center text-primary">
          Login
        </Label>
        <FormProvider {...form}>
          <form
            noValidate
            className="flex flex-col w-full gap-y-6"
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
      </main>
    </div>
  );
}
