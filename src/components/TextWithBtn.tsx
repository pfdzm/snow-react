import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '../hooks/useQuery';
import Button from './Button';

const TextWithBtn: React.FC = () => {
  let query = useQuery();
  const id = query.get('id');
  let auth = useAuth();
  let history = useHistory();
  let location = useLocation<{ from: { pathname: string } }>();
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (id) {
      auth?.signin(() => {
        history.replace(from);
      }, id);
    }
  }, [id]);

  return (
    <>
      <h1>This is a title!</h1>
      {auth?.user ? (
        <>
          <h3>
            Your secret token is <code>{auth?.user}</code>
          </h3>
          <Button
            onClick={() => {
              auth?.signout(() => {});
            }}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>
          <p>
            And this is some text! Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Sit molestias corrupti voluptatum, quas totam
            sequi sint, et vitae laboriosam dolor laborum consectetur quasi ipsa
            accusantium, blanditiis debitis eos amet officiis.
          </p>
          <Button>I'm a button!</Button>
        </>
      )}
    </>
  );
};

export default TextWithBtn;
