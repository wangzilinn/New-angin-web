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
