import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';

const LoginPage: React.FC = () => {
  let location = useLocation<{ from: { pathname: string } }>();
  let { from } = location.state || { from: { pathname: '/' } };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <Button>
        <Link to="/auth?id=secret-auth-string">Log in</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
