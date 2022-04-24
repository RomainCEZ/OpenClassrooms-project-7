export interface UserProps {
    id?: string
    email: string
    username: string
    password: string
    role?: string
    timestamp?: number
    postsCount?: number
    commentsCount?: number
    profilePicture?: string
}