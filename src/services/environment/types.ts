import { BaseResponse } from '@services/types';

export type Environment = {
  id: string;
  name: string;
};

export type GetAllEnvironmentResponse = BaseResponse<Environment[]>;

export type CreateEnvironmentRequest = Pick<Environment, 'name'>;

export type CreateEnvironmentResponse = BaseResponse<Environment>;

export type DeleteEnvironmentResponse = BaseResponse<Environment>;

export type UpdateEnvironmentRequest = Pick<Environment, 'name'>;

export type UpdateEnvironmentResponse = BaseResponse<Environment>;
