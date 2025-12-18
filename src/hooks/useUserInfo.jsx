import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserInfo = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/profile");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 0,
  });

  if (authLoading) return [{}, true, false, null];

  return [data || {}, isLoading, isError, error];
};

export default useUserInfo;
