import { axiosInstance as axios } from "./AxiosInstance";
import { PostProps } from "../pages/Post/interfaces/PostProps";

class PostsApiProvider {
    private readonly postsApiPrefix: string;
    constructor() {
        this.postsApiPrefix = "api/posts";
    }
    async getAllPosts(): Promise<PostProps[]> {
        const response = await axios.get(this.postsApiPrefix);
        return response.data;
    }

    async createPost(post: PostProps) {
        await axios.post(this.postsApiPrefix, post);
    }

    async getPostById(id: string): Promise<PostProps> {
        const post = await axios.get(`${this.postsApiPrefix}/${id}`);
        return post.data;
    }
    async getMyPosts() {
        const posts = await axios.get(`api/posts/myposts`);
        return posts.data;
    }
    async editPost(id: string, post: PostProps) {
        await axios.patch(`${this.postsApiPrefix}/${id}`, post);
    }

    async deletePost(id: string) {
        await axios.delete(`${this.postsApiPrefix}/${id}`);
    }

    async getFavorites() {
        const favorites = await axios.get(`api/posts/myfavorites`);
        return favorites.data;
    }

    async likePost(postId) {
        await axios.post(`${this.postsApiPrefix}/${postId}/like`, { like: 1 });
    }
    async dislikePost(postId) {
        await axios.post(`${this.postsApiPrefix}/${postId}/like`, { like: -1 });
    }
}

export const postsApiProvider = new PostsApiProvider();
