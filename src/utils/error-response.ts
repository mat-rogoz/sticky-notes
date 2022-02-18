export type ApiError = {
  code: number;
  message: string;
};

export const ErrorResponse = (code: number, message: string): ApiError => ({
  code,
  message,
});
