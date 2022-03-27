import axios from "axios";
import { Post } from "../utils/interfaces/Post"

class ApiProvider {
    constructor() {
        const localhost = "http://localhost:8000"
        const localIp = "http://192.168.0.10:8000"
        const heroku = "https://nestjs-backend-groupomania.herokuapp.com"

        axios.defaults.baseURL = `${process.env.DOMAIN_ADDRESS}`
        axios.defaults.withCredentials = true
    }

    async getAllPosts(): Promise<Post[]> {
        const response = await axios.get("/api/posts")
        return response.data
    }

    async createPost(postData: FormData) {
        await axios.post("/posts", postData)
    }

    async getPostById(id: number): Promise<Post> {
        const post = await axios.get(`/api/posts/${id}`)
        return post.data
    }

    async editPost(id: number, data: FormData) {
        await axios.patch(`/api/posts/${id}`, data)
    }

    async deletePost(id: number) {
        await axios.delete(`/api/posts/${id}`)
    }
}

export const apiProvider = new ApiProvider()