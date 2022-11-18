import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import LoadingPage from './LoadingPage';

export default function PageLayout() {
  const { userToken } = useAuth();

  return (
    <>
      <NavBar />
      {userToken === null ? <LoadingPage /> : <Outlet />}
    </>
  );
}
