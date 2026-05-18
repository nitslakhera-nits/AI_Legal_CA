import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

// Response Interceptor
apiClient.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // access token expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                // refresh token API call
                await axios.post("http://localhost:3000/user/refresh-token", {}, { withCredentials: true });

                // retry original request
                return apiClient(originalRequest);

            } catch (refreshError) {

                // refresh token bhi expire
                window.location.href = "/";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;