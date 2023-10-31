import { post } from '@services/api';

import { LoginRequest, LoginResponse } from './types';

export const login = async (values: LoginRequest): Promise<LoginResponse> => {
  const response = await post<LoginRequest, LoginResponse>(
    'auth/login',
    values
  );

  return response;
};
