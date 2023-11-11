import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCustomAtom } from '@store';
import { tokenAtom } from '@store/atoms';

import notification from '@lib/notification';

import paths from '@routes/paths';

import { useLocalStorage } from '@hooks/useLocalStorage';

import { loginDefaultValues, loginSchema } from '@services/auth/helpers';
import { login } from '@services/auth/service';

import { LOCAL_STORAGE_KEYS } from '@common/constants';

export default function useHandle() {
  const navigate = useNavigate();

  const [, setToken] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.TOKEN);

  const [, setStateToken] = useCustomAtom(tokenAtom);

  const methods = useForm({
    mode: 'onChange',
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onLoginSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    methods.handleSubmit(async (formValues) => {
      const res = await login(formValues);

      setStateToken(res.data.accessToken);
      setToken(res.data.accessToken);
      notification('Login success. Redirecting to dashboard.', 'success');
      navigate(paths.dashboard);
    })();
  };

  return {
    form: methods,
    onLoginSubmit,
  };
}
