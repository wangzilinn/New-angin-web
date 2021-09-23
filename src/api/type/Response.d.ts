export type Response<T> = {
  code: number;
  data: T;
  msg: string;
};

export type Page<T> = {
  elements: T[];
  currentNumber: number;
  totalNumber: number;
  currentPage: number;
  totalPages: number;
}
