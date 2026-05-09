import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../Store/authStore";
import { roles } from "../Constants/ConstantsFromBack";
const ProtectedRoute = ({ allowedRoles }) => {
  const { role, user } = useAuthStore();
 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === roles[0]) return <Navigate to="/admin" replace />;
    if (role === roles[2]) return <Navigate to="/receptionist" replace />;
    if (role === roles[1]) return <Navigate to="/customer" replace />;
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
