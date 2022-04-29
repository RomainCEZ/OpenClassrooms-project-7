export interface PostProps {
    id: string
    title: string
    content: any
    imageName?: string
    author: string
    authorId: string
    authorPicture?: string
    timestamp?: number
    likes?: string[]
    dislikes?: string[]
    commentsNumber?: number
}