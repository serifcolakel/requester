import React from 'react';
import { Navigate } from 'react-router-dom';

import { useCustomAtomValue } from '@store';
import { tokenAtom } from '@store/atoms';

import notification from '@lib/notification';

import paths from '@routes/paths';

import { useLocalStorage } from '@hooks/useLocalStorage';

import { LOCAL_STORAGE_KEYS } from '@common/constants';

type Props = {
  children: React.ReactNode;
};

export default function Protected({ children }: Props) {
  const token = useCustomAtomValue(tokenAtom);

  const [getToken] = useLocalStorage<string>(LOCAL_STORAGE_KEYS.TOKEN);

  if (token || getToken()) {
    return children;
  }

  notification('You must be logged in to access this page.', 'error');

  return <Navigate to={paths.login} />;
}
