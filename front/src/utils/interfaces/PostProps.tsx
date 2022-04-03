export interface PostProps {
    id?: string;
    title: string;
    body: string;
    imageUrl?: string;
    author?: string;
    authorId?: string;
    timestamp?: Date;
    file?: File;
    editorContent?: Object;
}
