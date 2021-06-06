export type PageData = {
    page: number,
    limit: number
}
export type Category = {
    id: string,
    name: string
}
export type Tag = {
    id: string,
    name: string
}
export type Query = {
    key: string
    value: string
}
export type ArticleDigest = {
    author: string
    categoryName: string
    cover: string
    createTime: string|null
    editTime: string|null
    id: string
    publishTime: string|null
    state: string
    tagNames: string[]
    title: string
}

export type Article = {
    author: string
    categoryName: string
    cover: string
    createTime: string|null
    editTime: string|null
    id: string
    publishTime: string|null
    state: string
    tagNames: string[]
    title: string,
    content: string
    contentMd: string
}

export type Comment = {
    avatar: string | null
    username: string | null
    content: string
    date: string
}
