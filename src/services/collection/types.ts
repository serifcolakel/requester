import { BaseResponse } from '@services/types';

import { TMethod } from '@common/types';

export type Request = {
  id: string;
  name: string;
  method: TMethod;
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
