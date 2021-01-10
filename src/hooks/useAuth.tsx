import * as React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';
const { useContext, createContext, useState } = React;

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext<IAuth | undefined>(undefined);

interface IAuth {
  user: null | string;
  signin: (cb: () => void, token: string) => void;
  signout: (cb: () => void) => void;
}

const fakeAuth = {
  isAuthenticated: false,
  async signin(cb: (obtoken: string) => void, token: string) {
    const response = await fetch('http://localhost:8080/token', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ token: token }),
    });
    const { token: obtoken } = await response.json();

    console.log(obtoken);

    if (obtoken && obtoken === 'top-secret-token') {
      fakeAuth.isAuthenticated = true;
      cb(obtoken);
    }
  },
  signout(cb: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

export const useProvideAuth: () => IAuth = () => {
  const [user, setUser] = useState<null | string>(null);

  const signin = async (cb: () => void, token: string) => {
    cb();
    return await fakeAuth.signin(setUser, token);
  };

  const signout = (cb: () => void) => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
};

export const AuthButton: React.FC = () => {
  let history = useHistory();
  let auth = useAuth();

  return auth?.user ? (
    <p>
      Welcome!{' '}
      <button
        onClick={() => {
          auth?.signout(() => history.push('/'));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
