import { useQuery } from '@tanstack/react-query';

import useAxiosPublic from './useAxiosPublic';

const useGuides = () => {
    const axiosPublic = useAxiosPublic();

    const { data: guides = [], refetch } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axiosPublic.get('/tourGuides');
            return res.data;
        }
    });

    return [guides,  refetch];
};


export default useGuides;