export type Post =  {
    id?: number,
    title: string,
    body: string,
    imageUrl?: string
}

export type NewPostType = { 
    title: string, 
    body: string, 
    file?: File,
    imageUrl?: string
}