import { axiosDelete, axiosPut, get, post } from './api';

interface Entity {
  id: number;
}

/**
 * A service for making HTTP requests to a specified endpoint.
 */
class HttpService {
  endpoint: string;

  /**
   * Creates an instance of HttpService.
   * @param {string} endpoint - The endpoint to make HTTP requests to.
   */
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Sends a GET request to the endpoint to retrieve all data.
   * @template T - The type of data to retrieve.
   * @returns {{ request: Promise<T>; cancel: () => void }} - An object containing the request promise and a cancel function.
   */
  getAll<T>(): { request: Promise<T>; cancel: () => void } {
    const controller = new AbortController();

    const request = get<T>(`${this.endpoint}`, {
      signal: controller.signal,
    });

    return {
      request,
      cancel: () => controller.abort(),
    };
  }

  /**
   * Sends a DELETE request to the endpoint to delete the specified entity.
   * @template T - The type of entity to delete.
   * @param {T} entity - The entity to delete.
   * @returns {Promise<T>} - A promise that resolves with the deleted entity.
   */
  delete<T extends Entity>(entity: T): Promise<T> {
    return axiosDelete(`${this.endpoint}/${entity.id}`);
  }

  /**
   * Sends a POST request to the endpoint to create a new entity.
   * @template T - The type of entity to create.
   * @param {T} entity - The entity to create.
   * @returns {Promise<T>} - A promise that resolves with the created entity.
   */
  create<T>(entity: T): Promise<T> {
    return post(`${this.endpoint}`, entity);
  }

  /**
   * Sends a PUT request to the endpoint to update the specified entity.
   * @template T - The type of entity to update.
   * @param {T} entity - The entity to update.
   * @returns {Promise<T>} - A promise that resolves with the updated entity.
   */
  update<T extends Entity>(entity: T): Promise<T> {
    return axiosPut(`${this.endpoint}/${entity.id}`, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
