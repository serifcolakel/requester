import { axiosDelete, axiosPut, post } from '@services/api';

import {
  CreateVariableRequest,
  CreateVariableResponse,
  GetAllEnvironmentRequest,
  GetAllVariableResponse,
  UpdateVariableRequest,
  UpdateVariableResponse,
} from './types';

export const getAllVariables = async (
  values: GetAllEnvironmentRequest
): Promise<GetAllVariableResponse> => {
  const response = await post<GetAllEnvironmentRequest, GetAllVariableResponse>(
    'variables/all',
    values
  );

  return response;
};

export const createVariable = async (
  values: CreateVariableRequest
): Promise<CreateVariableResponse> => {
  const response = await post<CreateVariableRequest, CreateVariableResponse>(
    'variables',
    values
  );

  return response;
};

export const deleteVariable = async (
  id: string
): Promise<CreateVariableResponse> => {
  const response = await axiosDelete<CreateVariableResponse>(`variables/${id}`);

  return response;
};

export const updateVariable = async (
  id: string,
  values: UpdateVariableRequest
): Promise<CreateVariableResponse> => {
  const response = await axiosPut<
    UpdateVariableRequest,
    UpdateVariableResponse
  >(`variables/${id}`, values);

  return response;
};
