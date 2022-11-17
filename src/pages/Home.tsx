import UserArticles from '../components/UserArticles';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { userToken } = useAuth();

  return (
    <div>
      {userToken ? <UserArticles /> : <div>Welcome page place holder</div>}
    </div>
  );
}
