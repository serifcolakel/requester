import { axiosDelete, axiosPut, get, post } from '@services/api';

import {
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  GetAllEnvironmentResponse,
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
} from './types';

export const getAllEnvironments =
  async (): Promise<GetAllEnvironmentResponse> => {
    const response = await get<GetAllEnvironmentResponse>('environments');

    return response;
  };

export const createEnvironment = async (
  values: CreateEnvironmentRequest
): Promise<CreateEnvironmentResponse> => {
  const res = post<CreateEnvironmentRequest, CreateEnvironmentResponse>(
    'environments',
    values
  );

  return res;
};

export const deleteEnvironment = async (id: string): Promise<void> => {
  const res = await axiosDelete<void>(`environments/${id}`);

  return res;
};

export const updateEnvironment = async (
  id: string,
  values: UpdateEnvironmentRequest
): Promise<UpdateEnvironmentResponse> => {
  const res = await axiosPut<
    UpdateEnvironmentRequest,
    UpdateEnvironmentResponse
  >(`environments/${id}`, values);

  return res;
};
