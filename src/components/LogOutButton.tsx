import useAuth from '../hooks/useAuth';

export default function LogOutButton() {
  const { userToken, setUserToken, setUserInfo } = useAuth();

  async function logOut() {
    try {
      await fetch('https://blog-api-787a.onrender.com/user/log-out', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${userToken}`,
        },
      });

      setUserToken?.('');
      setUserInfo?.({ name: '', lastName: '' });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button type="button" className="log-out-button" onClick={logOut}>
      Log out
    </button>
  );
}
