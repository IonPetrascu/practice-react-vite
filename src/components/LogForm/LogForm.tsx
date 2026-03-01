import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginSchema } from './schema';
import type { Inputs, LoginFormValues } from './types';

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<Inputs> = (data: LoginFormValues) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', { required: 'Email обязательный' })}
          className="mr-2 border"
          type="email"
        />
        {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
        <input {...register('password')} className="mr-2 border" type="password" />
        {errors.password && (
          <span className="text-xs text-red-400">{errors.password?.message}</span>
        )}
        <button>Login</button>
      </form>
      ;
    </>
  );
};

export default LoginForm;
