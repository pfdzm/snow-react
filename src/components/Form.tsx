import * as React from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';

const Form = () => {
  type Inputs = {
    email: string;
  };

  const { register, handleSubmit, formState, setValue } = useForm<Inputs>({
    mode: 'onChange',
  });

  const { isValid, errors } = formState;
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
      <div>
        <label htmlFor="email">What's your email address?</label>
        <div aria-hidden className="w-full h-full relative">
          <input
            type="email"
            name="email"
            className="focus:ring-yellow-300 focus:border-yellow-300 w-full"
            ref={(e: HTMLInputElement) => {
              register(e, {
                required: 'This field is required!',
                validate: (value: string) =>
                  /\S+@\S+/gi.test(value) || 'Invalid email address',
              });
            }}
            onChange={(e) => {
              setValue('email', e.target.value.toLowerCase(), {});
            }}
            required
          />
          <div className="text-red-700 font-medium text-sm">
            {errors.email && errors.email.message}&nbsp;
          </div>
        </div>
      </div>
      <Button
        disabled={!formState.isValid}
        type="submit"
        className={
          !formState.isValid
            ? 'self-end py-4 px-8 text-lg rounded-full bg-gray-200 transform'
            : 'self-end py-4 px-8 text-lg rounded-full bg-yellow-300 hover:bg-yellow-400 transform'
        }
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
