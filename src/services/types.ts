export type BaseResponse<T = null> = {
  data: T;
  success: boolean;
  message: string;
};
