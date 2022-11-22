import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function LogedInAuth() {
  const { userToken } = useAuth();

  return userToken ? <Navigate replace to="/" /> : <Outlet />;
}
