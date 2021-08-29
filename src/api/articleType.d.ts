/*
 * @Description:
 * @Author: Zillion Wang
 * @Date: 2021-06-05 23:04:36
 * @LastEditors: Zillion Wang
 * @LastEditTime: 2021-06-07 22:39:32
 */
export type PageData = {
  page: number;
  limit: number;
};
export type Category = {
  id: string;
  name: string;
};
export type Tag = {
  id: string;
  name: string;
};
export type Query = {
  key: string;
  value: string;
};
export type ArticleDigest = {
  author: string;
  categoryName: string;
  cover: string;
  createTime: string | null;
  editTime: string | null;
  id: string;
  publishTime: string | null;
  state: string;
  tagNames: string[];
  title: string;
};

export type Article = {
  author: string;
  categoryName: string;
  cover: string;
  createTime: string | null;
  editTime: string | null;
  id: string;
  publishTime: string | null;
  state: string;
  tagNames: string[];
  title: string;
  content: string;
  contentMd: string;
};

export type Comment = {
  articleTitle: string;
  articleId: string;
  avatar: string | null;
  username: string | null;
  content: string;
  date: string;
};
