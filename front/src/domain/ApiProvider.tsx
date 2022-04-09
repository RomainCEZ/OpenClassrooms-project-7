import axios from "axios";
import { PostProps } from "../utils/interfaces/PostProps";

class ApiProvider {
    constructor() {
        const localhost = "http://localhost:8000";
        const localIp = "http://192.168.0.10:8000";
        const heroku = "https://groupomania-socials.herokuapp.com";

        axios.defaults.baseURL = `${heroku}`;
        axios.defaults.withCredentials = true;
    }

    async getAllPosts(): Promise<PostProps[]> {
        const response = await axios.get("/api/posts");
        return response.data;
    }

    async createPost(postData: FormData) {
        await axios.post("/api/posts", postData);
    }

    async getPostById(id: string): Promise<PostProps> {
        const post = await axios.get(`/api/posts/${id}`);
        return post.data;
    }

    async editPost(id: string, data: FormData) {
        await axios.patch(`/api/posts/${id}`, data);
    }

    async deletePost(id: string) {
        await axios.delete(`/api/posts/${id}`);
    }

    async createComment(postId: string, commentData: { content: string }) {
        await axios.post(`/api/comments/${postId.toString()}`, commentData);
    }

    async getCommentsByPostId(postId: string) {
        const comments = await axios.get(`/api/comments/${postId.toString()}`);
        return comments.data;
    }
    async getCommentById(commentId: string) {
        const comment = await axios.get(
            `/api/comments/${commentId.toString()}`
        );
        return comment.data;
    }
    async updateComment(commentId: string, content: string) {
        await axios.patch(`/api/comments/${commentId.toString()}`, content);
    }
    async deleteComment(commentId: string) {
        await axios.delete(`/api/comments/${commentId.toString()}`);
    }
}

export const apiProvider = new ApiProvider();
