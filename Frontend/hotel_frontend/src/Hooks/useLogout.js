import useAuthStore from "../Store/authStore";

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  const logoutUser = () => {
    logout();
  };

  return { logoutUser };
};