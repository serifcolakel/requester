import { handleResponse } from '@helpers/serviceHandlers';

import { axiosDelete, axiosPut, get, post } from '@services/api';

import {
  CreateCollectionRequest,
  CreateCollectionResponse,
  DeleteCollectionResponse,
  GetAllCollectionResponse,
  UpdateCollectionRequest,
  UpdateCollectionResponse,
} from './types';

export const getAllCollections = async (
  showNotification = false
): Promise<GetAllCollectionResponse> => {
  const response = await get<GetAllCollectionResponse>('collections');

  if (showNotification) handleResponse(response);

  return response;
};

export const createCollection = async (
  values: CreateCollectionRequest
): Promise<CreateCollectionResponse> => {
  const res = await post<CreateCollectionRequest, CreateCollectionResponse>(
    'collections',
    values
  );

  handleResponse(res);

  return res;
};

export const deleteCollection = async (
  id: string
): Promise<DeleteCollectionResponse> => {
  const res = await axiosDelete<DeleteCollectionResponse>(`collections/${id}`);

  handleResponse(res);

  return res;
};

export const updateCollection = async (
  id: string,
  values: UpdateCollectionRequest
): Promise<UpdateCollectionResponse> => {
  const res = await axiosPut<UpdateCollectionRequest, UpdateCollectionResponse>(
    `collections/${id}`,
    values
  );

  handleResponse(res);

  return res;
};
