import { axiosInstance as axios } from "./AxiosInstance";

class CommentsApiProvider {
    private readonly commentsApiPrefix: string;
    constructor() {
        this.commentsApiPrefix = "api/comments";
    }

    async createComment(postId: string, commentData: { content: string }) {
        await axios.post(
            `${this.commentsApiPrefix}/${postId.toString()}`,
            commentData
        );
    }

    async getCommentsByPostId(postId: string) {
        const comments = await axios.get(
            `${this.commentsApiPrefix}/${postId.toString()}`
        );
        return comments.data;
    }
    async getCommentById(commentId: string) {
        const comment = await axios.get(
            `${this.commentsApiPrefix}/${commentId.toString()}`
        );
        return comment.data;
    }
    async getMyComments() {
        const comments = await axios.get(
            `${this.commentsApiPrefix}/mycomments`
        );
        return comments.data;
    }
    async updateComment(commentId: string, content: { content: string }) {
        await axios.patch(
            `${this.commentsApiPrefix}/${commentId.toString()}`,
            content
        );
    }
    async deleteComment(commentId: string) {
        await axios.delete(`${this.commentsApiPrefix}/${commentId.toString()}`);
    }
    async likeComment(commentId) {
        await axios.post(`${this.commentsApiPrefix}/${commentId}/like`, {
            like: 1,
        });
    }
    async dislikeComment(commentId) {
        await axios.post(`${this.commentsApiPrefix}/${commentId}/like`, {
            like: -1,
        });
    }
}

export const commentsApiProvider = new CommentsApiProvider();
