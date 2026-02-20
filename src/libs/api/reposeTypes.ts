export type ApiResponse<T> = {
  code: string;
  message: string;
  reason?: string;
  data: T;
};
