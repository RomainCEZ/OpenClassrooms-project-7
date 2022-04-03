export type Post = {
    id?: string;
    title: string;
    body: string;
    imageUrl?: string;
    author?: string;
    authorId?: string;
    timestamp?: Date;
    file?: File;
    editorContent?: Object;
};
