import { z } from 'zod';

import { BaseResponse } from '@services/types';

export const MethodEnum = z.enum(['GET', 'POST', 'PUT', 'DELETE']);

export type Request = {
  id: string;
  name: string;
  method: keyof typeof MethodEnum;
};

export type Collection = {
  id: string;
  name: string;
  requests: Request[];
};

export type GetAllCollectionResponse = BaseResponse<Collection[]>;

export type CreateCollectionRequest = Pick<Collection, 'name'>;

export type CreateCollectionResponse = BaseResponse<Collection>;

export type DeleteCollectionResponse = BaseResponse<Collection>;

export type UpdateCollectionRequest = Pick<Collection, 'name'>;

export type UpdateCollectionResponse = BaseResponse<Collection>;
