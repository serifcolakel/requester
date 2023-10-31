import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginDefaultValues, loginSchema } from '@services/auth/helpers';

export default function useHandle() {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const submitterId = e.nativeEvent.submitter?.id ?? '';

    e.preventDefault();
    methods.handleSubmit((formValues) => {
      window.console.log(formValues, submitterId);
    })();
  };

  return {
    form: methods,
    onLoginSubmit,
  };
}
