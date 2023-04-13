import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_BACK_END_URL_DEV
          : process.env.REACT_APP_BACK_END_URL_PROD
      }/api/users/get_citations/`,
});

axiosInstance.interceptors.request.use((config) => {
    config.params = config.params || {};
	console.log("Config", config);
    return config;
});

export default axiosInstance;
