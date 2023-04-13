import axios from "axios";
import axiosInstance from "./AxiosInstance";

export function getCitations() {
    return axiosInstance.get();
};
