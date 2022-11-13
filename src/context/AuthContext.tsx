import { createContext, useMemo, useState } from 'react';

interface AuthContextProviderProps {
  children: React.ReactNode;
}

interface IAuthContext {
  userToken?: string;
  setUserToken?: React.Dispatch<React.SetStateAction<string>>;
  userInfo?: IUserInfo;
  setUserInfo?: React.Dispatch<React.SetStateAction<IUserInfo>>;
}

interface IUserInfo {
  name: string;
  lastName: string;
}

const initialUSerInfo = {
  name: '',
  lastName: '',
};

const AuthContext = createContext<IAuthContext>({});

export default function ContextProvider({
  children,
}: AuthContextProviderProps) {
  const [userToken, setUserToken] = useState('');
  const [userInfo, setUserInfo] = useState<IUserInfo>(initialUSerInfo);

  const value = useMemo(
    () => ({
      userToken,
      setUserToken,
      userInfo,
      setUserInfo,
    }),
    [userToken]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
