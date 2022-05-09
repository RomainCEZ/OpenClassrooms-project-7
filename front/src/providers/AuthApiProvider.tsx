import { axiosInstance as axios } from "./AxiosInstance";

class AuthApiProvider {
    private readonly authApiPrefix: string;
    constructor() {
        this.authApiPrefix = "auth";
    }
    async login(loginInfo: { email: string; password: string }): Promise<any> {
        try {
            const loginResponse = await axios.post("auth/login", loginInfo);
            return loginResponse;
        } catch (error) {
            throw error.response.data;
        }
    }

    async signup(userInfo): Promise<void> {
        try {
            await axios.post(`${this.authApiPrefix}/signup`, userInfo);
        } catch (error) {
            throw error.response.data;
        }
    }

    async relog() {
        try {
            await axios.post(this.authApiPrefix);
        } catch (error) {
            return error.response.status;
        }
    }

    async logout() {
        await axios.post(`${this.authApiPrefix}/logout`);
    }

    async changeUsername(username: { username: string }) {
        try {
            const response = await axios.patch(
                `${this.authApiPrefix}/changeusername`,
                username
            );
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async changePassword(payload: {
        currentPassword: string;
        newPassword: string;
    }) {
        try {
            await axios.patch(`${this.authApiPrefix}/changepassword`, payload);
        } catch (error) {
            throw error.response.data;
        }
    }

    async requestpasswordreset(email: { email: string }) {
        await axios.post(`${this.authApiPrefix}/requestpasswordreset`, email);
    }
    async resetPassword(resetInfos: {
        password: string;
        resetToken: string;
        userId: string;
    }) {
        try {
            await axios.post(`${this.authApiPrefix}/resetpassword`, resetInfos);
        } catch (error) {
            throw error.response.data;
        }
    }
    async disableAccount() {
        await axios.delete(`${this.authApiPrefix}/disableaccount`);
    }
}

export const authApiProvider = new AuthApiProvider();
