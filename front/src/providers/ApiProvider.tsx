import axios from "axios";
import { PostProps } from "../pages/Post/interfaces/PostProps";

class ApiProvider {
    private readonly protocol: string;
    private readonly apiHostname: string;
    private readonly apiPort: string;
    private readonly apiUrl: string;
    constructor() {
        this.protocol = location.protocol;
        this.apiHostname = location.hostname;
        this.apiPort = location.port ? ":8000" : "";
        this.apiUrl = this.protocol + "//" + this.apiHostname + this.apiPort;

        axios.defaults.baseURL = this.apiUrl;
        axios.defaults.withCredentials = true;
    }

    async getAllPosts(): Promise<PostProps[]> {
        const response = await axios.get("/api/posts");
        return response.data;
    }

    async createPost(post: PostProps) {
        await axios.post("/api/posts", post);
    }

    async getPostById(id: string): Promise<PostProps> {
        const post = await axios.get(`/api/posts/${id}`);
        return post.data;
    }

    async editPost(id: string, post: PostProps) {
        await axios.patch(`/api/posts/${id}`, post);
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
    async updateComment(commentId: string, content: { content: string }) {
        await axios.patch(`/api/comments/${commentId.toString()}`, content);
    }
    async deleteComment(commentId: string) {
        await axios.delete(`/api/comments/${commentId.toString()}`);
    }
    async getProfile() {
        const profileInfos = await axios.get("api/users/profile");
        return profileInfos.data;
    }
}

export const apiProvider = new ApiProvider();
