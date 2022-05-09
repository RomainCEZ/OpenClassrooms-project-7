import { axiosInstance as axios } from "./AxiosInstance";

class UsersApiProvider {
    private readonly usersApiPrefix: string;
    constructor() {
        this.usersApiPrefix = "api/users";
    }
    async getProfile() {
        const profileInfos = await axios.get(`${this.usersApiPrefix}/profile`);
        return profileInfos.data;
    }

    async favorite(postId: string) {
        const favorites = await axios.post(`${this.usersApiPrefix}/favorite`, {
            postId,
        });
        return favorites.data;
    }

    async uploadProfilePicture(profilePicture) {
        const uploadResponse = await axios.post(
            `${this.usersApiPrefix}/profilepicture/upload`,
            { profilePicture }
        );
        return uploadResponse.data;
    }
}

export const usersApiProvider = new UsersApiProvider();
