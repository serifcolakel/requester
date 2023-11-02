import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { handleError } from '@helpers/serviceHandlers';

import { LOCAL_STORAGE_KEYS } from '@common/constants';

const cancelToken = axios.CancelToken.source();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_SERVICE_URL,
  cancelToken: cancelToken.token,
});

axiosInstance.interceptors.request.use((config) => {
  // INFO - This is a workaround to avoid showing the error notification when the request is canceled.
  if (axios.isCancel(config)) {
    window.console.log('TRequest canceled', config.message);
  }

  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);

  if (!token) {
    return config;
  }

  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${JSON.parse(token)}`;

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    // handleResponse(response.data);

    return response;
  },
  (error: AxiosError) => {
    // INFO - This is a workaround to avoid showing the error notification when the request is canceled.
    if (axios.isCancel(error)) {
      window.console.log('TRequest canceled', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Makes a GET request to the specified URL and returns the response data.
 * @param url - The URL to make the GET request to.
 * @param config - Optional Axios request configuration.
 * @returns A Promise that resolves to the response data.
 * @throws An error if the request fails.
 */
export const get = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.get<TResponse>(url, config);

    return response.data;
  } catch (error) {
    handleError(error);

    throw error;
  }
};

/**
 * Sends a POST request to the specified URL with the given data and configuration.
 * @template TRequest The type of the request data.
 * @template TResponse The type of the response data.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to send with the request.
 * @param {AxiosRequestConfig} [config] The configuration for the request.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */
export const post = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post<TResponse>(url, data, config);

    return response.data;
  } catch (error) {
    handleError(error);

    throw error;
  }
};

/**
 * Sends a DELETE request to the specified URL using axiosInstance.
 * @template TResponse The expected response type.
 * @param {string} url The URL to send the request to.
 * @param {AxiosRequestConfig} [config] The optional request configuration.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */
export const axiosDelete = async <TResponse>(
  url: string,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.delete<TResponse>(url, config);

    return response.data;
  } catch (error) {
    handleError(error);

    throw error;
  }
};

/**
 * Sends a PUT request to the specified URL with the provided data and configuration.
 * @template TRequest The type of the request data.
 * @template TResponse The type of the response data.
 * @param {string} url The URL to send the request to.
 * @param {TRequest} data The data to send with the request.
 * @param {AxiosRequestConfig} [config] The configuration for the request.
 * @returns {Promise<TResponse>} A promise that resolves with the response data.
 * @throws {AxiosError} If the request fails.
 */
export const axiosPut = async <TRequest, TResponse>(
  url: string,
  data: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.put<TResponse>(url, data, config);

    return response.data;
  } catch (error) {
    handleError(error);

    throw error;
  }
};
