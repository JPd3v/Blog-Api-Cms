import UserArticles from '../components/UserArticles';

export default function Home() {
  // user placeholder context
  const user = 'asd';

  return (
    <div>{user ? <UserArticles /> : <div>Welcome page place holder</div>}</div>
  );
}
