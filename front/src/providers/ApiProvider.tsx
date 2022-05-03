import { axiosInstance as axios } from "./AxiosInstance";
import { PostProps } from "../pages/Post/interfaces/PostProps";

class ApiProvider {
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
    async getMyPosts() {
        const posts = await axios.get("api/posts/myposts");
        return posts.data;
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
    async getMyComments() {
        const comments = await axios.get("api/comments/mycomments");
        return comments.data;
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
    async uploadProfilePicture(profilePicture) {
        const uploadResponse = await axios.post(
            "api/users/profilepicture/upload",
            { profilePicture }
        );
        return uploadResponse.data;
    }
    async likePost(postId) {
        await axios.post(`/api/posts/${postId}/like`, { like: 1 });
    }
    async dislikePost(postId) {
        await axios.post(`/api/posts/${postId}/like`, { like: -1 });
    }
    async likeComment(commentId) {
        await axios.post(`/api/comments/${commentId}/like`, { like: 1 });
    }
    async dislikeComment(commentId) {
        await axios.post(`/api/comments/${commentId}/like`, { like: -1 });
    }
}

export const apiProvider = new ApiProvider();
