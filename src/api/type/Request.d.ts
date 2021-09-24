export type Query = {
  key: string;
  value: string;
};

export type PageQuery = {
  page: number;
  limit: number;
};

export type UserCredential = {
  username: string;
  password: string;
  kaptcha: string
}