import { AxiosError } from 'axios';

import notification from '@lib/notification';

import { BaseResponse } from '@services/types';

export const handleError = (error: unknown): void => {
  let message = 'An unknown error occurred.';

  if (error instanceof AxiosError) {
    message = error.response?.data?.message ?? error.message;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    message = error.message;
  }

  notification(`${message ?? ''}`, 'error');
};

export const handleResponse = <T = null>(response: BaseResponse<T>): void => {
  notification(response.message, 'success');
};
