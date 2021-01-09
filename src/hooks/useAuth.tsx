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
  signin(cb: () => void, token: string) {
    if (token && token === 'secret-auth-string') {
      fakeAuth.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
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

  const signin = (cb: () => void, token: string) => {
    return fakeAuth.signin(() => {
      setUser(token);
      cb();
    }, token);
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
