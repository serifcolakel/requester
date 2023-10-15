import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import notification from '@lib/notification';

const cancelToken = axios.CancelToken.source();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
  cancelToken: cancelToken.token,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (axios.isCancel(error)) {
      window.console.log('TRequest canceled', error.message);
    }

    return Promise.reject(error);
  }
);

export const get = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.get<TResponse>(url, config);

    return response.data;
  } catch (error) {
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;

    notification(`Error while fetching ${url}. ${message ?? ''}`, 'error');

    throw error;
  }
};

export const post = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post<TResponse>(url, data, config);

    return response.data;
  } catch (error) {
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;

    notification(`Error while posting ${url}. ${message ?? ''}`, 'error');

    throw error;
  }
};

export const axiosDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.delete<TResponse>(url, config);

    return response.data;
  } catch (error) {
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;

    notification(`Error while deleting ${url}. ${message ?? ''}`, 'error');

    throw error;
  }
};

export const axiosPut = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.put<TResponse>(url, data, config);

    return response.data;
  } catch (error) {
    const message = (error as AxiosError<{ message: string }>).response?.data
      ?.message;

    notification(`Error while updating ${url}. ${message ?? ''}`, 'error');
    throw error;
  }
};
