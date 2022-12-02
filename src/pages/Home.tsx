import Hero from '../components/Hero';
import UserArticles from '../components/UserArticles';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { userToken } = useAuth();

  return <main>{userToken ? <UserArticles /> : <Hero />}</main>;
}
