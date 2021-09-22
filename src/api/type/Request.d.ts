export type Response<T> = {
  code: number
  data: T
};

export type Query = {
  key: string;
  value: string;
};

export type PageQuery = {
  page: number;
  limit: number;
};