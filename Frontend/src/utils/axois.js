import axios from "axios";

const axiosClinet = axios.create({
    baseURL: "https://uber-lrvm.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClinet;
