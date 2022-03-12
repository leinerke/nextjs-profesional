import React, { createContext, useContext, useState } from 'react';
import Cookie from 'js-cookie';
import axios, { AxiosRequestConfig } from 'axios';
import endPoints from '@services/api';

type TUser = {
  id: number,
  email: string,
  password: string,
  name: string,
  role: string
}

type TAuthContext = {
  user: TUser | null,
  signIn: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<Partial<TAuthContext>>({});

const ProviderAuth: React.FC = ({ children }) => {
  const auth = useProviderAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

function useProviderAuth() {
  const [user, setUser] = useState<TUser | null>(null);

  const signIn = async (email: string, password: string) => {
    const options: AxiosRequestConfig = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      const token = access_token.access_token;
      Cookie.set('token', token, { expires: 5 });

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const { data: user } = await axios.get(endPoints.auth.profile);
      setUser(user);
    }
  };

  return { user, signIn };
}

export {
  ProviderAuth,
  useAuth,
};
