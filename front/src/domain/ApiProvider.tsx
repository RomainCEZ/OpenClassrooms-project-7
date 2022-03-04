import axios from "axios";
import { Post } from "../utils/interfaces/Post"

class ApiProvider {
    constructor() {
        const localhost = "http://localhost:8000"
        const localIp = "http://192.168.0.10:8000"

        axios.defaults.baseURL = `${localIp}/api`
    }

    async getAllPosts(): Promise<Post[]> {
        const response = await axios.get("/posts")
        return response.data
    }

    async createPost(postData: FormData) {
        await axios.post("/posts", postData)
    }

    async getPostById(id: number): Promise<Post> {
        const post = await axios.get(`/posts/${id}`)
        return post.data
    }

    async editPost(id: number, data: FormData) {
        await axios.patch(`/posts/${id}`, data)
    }

    async deletePost(id: number) {
        await axios.delete(`/posts/${id}`)
    }
}

export const apiProvider = new ApiProvider()