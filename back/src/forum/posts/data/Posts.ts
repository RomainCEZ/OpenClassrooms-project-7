import { Post } from "../entities/post.entity";

export const PostsData: Post[] = [
    {
        body: "Le commentaire est caché sur la page d'accueil",
        id: "1646256698879",
        imageUrl: "http://192.168.0.10:8000/images/fatcat.jpeg",
        title: "Post avec une image",
        userId: "admin"
    },
    { 
        id: "1", 
        title: "Post en français", 
        body: "Salut !",
        userId: "admin" 
    },
    {
        id: "2",
        title: "Post en anglais",
        body: "Hello !",
        userId: "admin"
    },
    {
        id: "3",
        title: "Post en allemand",
        body: "Hallo !",
        userId: "admin"
    },
    {
        id: "4",
        title: "Post en japonais",
        body: "おはよう !",
        userId: "admin"
    }
]
