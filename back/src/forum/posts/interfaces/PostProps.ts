export interface PostProps {
    id: string
    title: string
    content: any
    imageName?: string
    author: string
    authorId: string
    timestamp?: number
    commentsNumber?: number | null
}