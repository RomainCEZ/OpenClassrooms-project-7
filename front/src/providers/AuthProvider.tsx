import axios from "axios";

class AuthProvider {
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
