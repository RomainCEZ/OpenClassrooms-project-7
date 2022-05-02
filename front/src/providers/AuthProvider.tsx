import { axiosInstance as axios } from "./AxiosInstance";

class AuthProvider {
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
            await axios.post("auth/signup", userInfo);
        } catch (error) {
            throw error.response.data;
        }
    }

    async relog() {
        try {
            await axios.post("auth");
        } catch (error) {
            return error.response.status;
        }
    }

    async logout() {
        await axios.post("auth/logout");
    }

    async changeUsername(username: { username: string }) {
        try {
            const response = await axios.patch("auth/changeusername", username);
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
            await axios.patch("auth/changepassword", payload);
        } catch (error) {
            throw error.response.data;
        }
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
    async disableAccount() {
        await axios.delete("auth/disableaccount");
    }
}

export const authProvider = new AuthProvider();
