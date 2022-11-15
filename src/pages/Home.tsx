import UserArticles from '../components/UserArticles';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { userToken, userInfo } = useAuth();
  console.log(userToken);
  console.log(userInfo);

  return (
    <div>
      {userToken ? <UserArticles /> : <div>Welcome page place holder</div>}
    </div>
  );
}
