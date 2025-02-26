import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://tourism-server-site-mu.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
    
};

export default useAxiosPublic;