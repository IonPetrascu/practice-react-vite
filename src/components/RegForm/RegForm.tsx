import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerSchema } from './schema';
import type { RegisterFormValues } from './types';

const RegForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} className="mr-2 border" type="text" />
      {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
      <input {...register('email')} className="mr-2 border" type="email" />
      {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
      <input {...register('password')} className="mr-2 border" type="password" />
      {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
      <button>Register</button>
    </form>
  );
};

export default RegForm;
