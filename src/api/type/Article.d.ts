export type Category = {
  id: string;
  name: string;
};
export type Tag = {   
  id: string;
  name: string;
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
  isPaintingCover: boolean;
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


