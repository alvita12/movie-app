import axios from "axios";

// let bearerToken = "";

const axiosWithConfig = axios.create();

// export const setAxiosConfig = (token: string) => {
//     bearerToken = token;
// };

axiosWithConfig.interceptors.request.use((axiosConfig) => {
    axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
    axiosConfig.headers.Authorization = `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`;

    return axiosConfig;
});

export default axiosWithConfig;