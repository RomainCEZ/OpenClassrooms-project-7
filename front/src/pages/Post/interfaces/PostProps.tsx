export interface PostProps {
    id?: string;
    title: string;
    content: string;
    author?: string;
    authorId?: string;
    authorPicture?: string;
    likes: string[];
    dislikes: string[];
    timestamp?: Date;
    editorContent?: Object;
    commentsNumber?: number;
}
