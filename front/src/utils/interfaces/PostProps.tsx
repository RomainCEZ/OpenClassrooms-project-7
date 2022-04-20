export interface PostProps {
    id?: string;
    title: string;
    content: string;
    imageUrl?: string;
    author?: string;
    authorId?: string;
    timestamp?: Date;
    file?: File;
    editorContent?: Object;
    commentsNumber: number;
}
