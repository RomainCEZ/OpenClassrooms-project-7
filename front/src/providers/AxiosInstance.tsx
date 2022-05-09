import axios from "axios";

const protocol = location.protocol;
const apiHostname = location.hostname;
const apiPort = location.port ? ":8000" : "";
const apiUrl = protocol + "//" + apiHostname + apiPort;

export const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
});
