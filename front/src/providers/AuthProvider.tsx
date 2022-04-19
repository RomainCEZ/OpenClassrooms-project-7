import axios from "axios";
import e from "express";

class AuthProvider {
    constructor() {
        const localhost = "http://localhost:8000";
        const localIp = "http://192.168.0.10:8000";
        const heroku = "https://groupomania-socials.herokuapp.com";

        axios.defaults.baseURL = `${localIp}`;
    }

    async login(loginInfo): Promise<any> {
        try {
            const loginResponse = await axios.post("/auth/login", loginInfo);
            return loginResponse;
        } catch (error) {
            throw error.response.data;
        }
    }

    async signup(userInfo): Promise<void> {
        try {
            await axios.post("/auth/signup", userInfo);
        } catch (error) {
            throw error.response.data;
        }
    }

    async relog() {
        try {
            const relogResponse = await axios.post("auth");
            if (relogResponse.data) {
                return relogResponse.data;
            }
            return relogResponse;
        } catch (error) {
            return error.response.status;
        }
    }

    async logout() {
        await axios.post("auth/logout");
    }

    async requestpasswordreset(email: { email: string }) {
        await axios.post("auth/requestpasswordreset", email);
    }
    async resetPassword(resetInfos: {
        password: string;
        resetToken: string;
        userId: string;
    }) {
        try {
            await axios.post("auth/resetpassword", resetInfos);
        } catch (error) {
            throw error.response.data;
        }
    }
}

export const authProvider = new AuthProvider();
