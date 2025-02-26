
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const useAdmin = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: roles = {}, isLoading: isRolesLoading } = useQuery({
        queryKey: [user?.email, 'roles'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/roles/${user.email}`);
            return res.data;
        }
    });

    return [roles, isRolesLoading];
};

export default useAdmin;
