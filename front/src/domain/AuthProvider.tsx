import axios from "axios";

class AuthProvider {
    constructor() {
        const localhost = "http://localhost:8000"
        const localIp = "http://192.168.0.10:8000"
        const heroku = "https://nestjs-backend-groupomania.herokuapp.com"

        axios.defaults.baseURL = `${localIp}`
    }

    async login(loginInfo): Promise<any> {
        const loginResponse = await axios.post("/auth/login", loginInfo)
        console.log(loginResponse.data)
        return loginResponse.data
    }

    async signup(userInfo) {
        await axios.post("/auth/signup", userInfo)
    }

}

export const authProvider = new AuthProvider()