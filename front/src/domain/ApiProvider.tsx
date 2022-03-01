import axios from "axios";
import Post from "src/utils/interfaces/Post";

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

    async createPost(postData: Post) {
        await axios.post("/posts", postData)
    }
    async getPostById(id: number): Promise<Post> {
        const post = await axios.get(`/posts/${id}`)
        return post.data
    }
}

export const apiProvider = new ApiProvider()