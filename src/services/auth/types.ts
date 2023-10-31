import { BaseResponse } from '@services/types';

import { loginSchema } from './helpers';

export type LoginRequest = (typeof loginSchema)['_input'];

export type LoginResponse = BaseResponse<{
  accessToken: string;
}>;
