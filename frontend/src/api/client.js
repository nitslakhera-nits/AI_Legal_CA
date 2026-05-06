import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true, // Include cookies in requests
});

export default apiClient;