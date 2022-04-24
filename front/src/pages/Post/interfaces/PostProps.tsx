export interface PostProps {
    id?: string;
    title: string;
    content: string;
    author?: string;
    authorId?: string;
    timestamp?: Date;
    editorContent?: Object;
    commentsNumber?: number;
}
