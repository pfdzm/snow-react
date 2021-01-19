import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useQuery } from '../hooks/useQuery';
import Button from './Button';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Signing out!');

const TextWithBtn: React.FC = () => {
  let query = useQuery();
  const id = query.get('id');
  let auth = useAuth();
  let history = useHistory();
  let location = useLocation<{ from: { pathname: string } }>();
  let { from } = location.state || { from: { pathname: '/' } };

  type Inputs = {
    email: string;
  };

  const { register, handleSubmit, formState } = useForm<Inputs>({
    mode: 'onChange',
  });

  const { isValid, errors } = formState;
  const onSubmit = (data: any) => console.log(data);

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <Toaster />
        <div>
          <label htmlFor="email">What's your email address?</label>
          <div aria-hidden className="w-full h-full relative">
            <input
              type="text"
              name="email"
              className="focus:ring-yellow-300 focus:border-yellow-300 w-full"
              ref={(e: HTMLInputElement) => {
                register(e, {
                  required: 'This field is required!',
                  validate: (value: string) =>
                    /\S+@\S+/gi.test(value) || 'Invalid email address',
                });
              }}
              required
            />
            {errors.email && (
              <div className="text-red-700 font-medium text-sm">
                {errors.email.message}
              </div>
            )}
          </div>
        </div>
        <Button disabled text-sm={!formState.isValid} type="submit">
          Submit
        </Button>
      </form>
      {auth?.user ? (
        <>
          <h3>
            Your secret token is <code>{auth?.user}</code>
          </h3>
          <Button
            onClick={() => {
              notify();
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
