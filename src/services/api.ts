import axios, { AxiosError } from 'axios';

const cancelToken = axios.CancelToken.source();

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
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

export const get = async <TResponse>(url: string): Promise<TResponse> => {
  try {
    const response = await axiosInstance.get<TResponse>(url);

    return response.data;
  } catch (error) {
    window.console.error(error);
    throw error;
  }
};

export const post = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.post<TResponse>(url, data);

    return response.data;
  } catch (error) {
    window.console.error(error);
    throw error;
  }
};

export const axiosDelete = async <TResponse>(
  url: string
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.delete<TResponse>(url);

    return response.data;
  } catch (error) {
    window.console.error(error);
    throw error;
  }
};

export const axiosPut = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  try {
    const response = await axiosInstance.put<TResponse>(url, data);

    return response.data;
  } catch (error) {
    window.console.error(error);
    throw error;
  }
};
