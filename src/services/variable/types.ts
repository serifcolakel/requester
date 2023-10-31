import { BaseResponse } from '@services/types';

export type Variable = {
  id: string;
  name: string;
  value: string;
  environmentId: string;
};

export type GetAllEnvironmentRequest = Pick<Variable, 'environmentId'>;

export type GetAllVariableResponse = BaseResponse<Variable[]>;

export type CreateVariableRequest = Omit<Variable, 'id'>;

export type CreateVariableResponse = BaseResponse<Variable>;

export type DeleteVariableResponse = BaseResponse<Variable>;

export type UpdateVariableRequest = Omit<Variable, 'id'>;

export type UpdateVariableResponse = BaseResponse<Variable>;
