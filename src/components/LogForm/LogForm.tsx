import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { loginSchema } from './schema';
import type { LoginFormValues } from './types';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';
const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });
  const { setUser } = useAuthStore();
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    return authService
      .login(data)
      .then(setUser)
      .catch(() => setUser(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} id="email" className="mr-2 border" type="email" />
      {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
      <label htmlFor="password">Password</label>
      <input {...register('password')} id="password" className="mr-2 border" type="password" />
      {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
      <button disabled={isSubmitting}>{isSubmitting ? 'Loading' : 'Login'}</button>
    </form>
  );
};

export default LoginForm;
