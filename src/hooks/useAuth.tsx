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
  error: string | null,
  user: TUser | null,
  signIn: (email: string, password: string) => void
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
  const [error, setError] = useState<string | null>(null);

  const signIn = async (email: string, password: string) => {
    const options: AxiosRequestConfig = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data: access_token } = await axios.post(endPoints.auth.login, { email, password }, options);
      if (access_token) {
        const token = access_token.access_token;
        Cookie.set('token', token, { expires: 5 });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const { data: user } = await axios.get(endPoints.auth.profile);
        setUser(user);
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          setError('Email o password incorrect');
        } else {
          setError('Ha ocurrido un error, por favor intente mas tarde');
        }
      }
    }
  };

  return {
    user,
    error,
    signIn,
  };
}

export {
  ProviderAuth,
  useAuth,
};
