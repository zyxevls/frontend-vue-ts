import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
    import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

const Api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use((config) =>
{
    const token = Cookies.get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default Api;