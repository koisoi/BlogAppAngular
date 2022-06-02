import { Post } from "./post.model";

export interface User {
    login: string,
    email: string,
    password: string,
    gender: 'Женский' | 'Не указан' | 'Мужской',
    id?: number,
    birthday?: string | null,
    avatar?: string | ArrayBuffer | null,
    interests?: string,
    about?: string,
    posts: Post[]
}