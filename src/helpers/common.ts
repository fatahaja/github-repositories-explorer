export interface IErrorStatus {
  error: boolean;
  message: string;
}

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
