import { handleResponse } from '@helpers/serviceHandlers';

import { axiosDelete, axiosPut, get, post } from '@services/api';

import {
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  DeleteEnvironmentResponse,
  GetAllEnvironmentResponse,
  UpdateEnvironmentRequest,
  UpdateEnvironmentResponse,
} from './types';

export const getAllEnvironments = async (
  showNotification = false
): Promise<GetAllEnvironmentResponse> => {
  const response = await get<GetAllEnvironmentResponse>('environments');

  if (showNotification) handleResponse(response);

  return response;
};

export const createEnvironment = async (
  values: CreateEnvironmentRequest
): Promise<CreateEnvironmentResponse> => {
  const res = await post<CreateEnvironmentRequest, CreateEnvironmentResponse>(
    'environments',
    values
  );

  handleResponse(res);

  return res;
};

export const deleteEnvironment = async (
  id: string
): Promise<DeleteEnvironmentResponse> => {
  const res = await axiosDelete<DeleteEnvironmentResponse>(
    `environments/${id}`
  );

  handleResponse(res);

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

  handleResponse(res);

  return res;
};
