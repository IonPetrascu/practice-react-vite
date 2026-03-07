import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerSchema } from './schema';
import type { RegisterFormValues } from './types';
import { authService } from '../../services/auth.service';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

const RegForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });
  const { setUser } = useAuthStore();

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    return authService
      .register(data)
      .then((user) => {
        setUser(user);
        toast.success('Аккаунт создан');
      })
      .catch(() => {
        setUser(null);
        toast.error('Не удалось зарегистрироваться');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input {...register('email')} id="email" className="mr-2 border" type="email" />
      {errors.email && <span className="text-xs text-red-400">{errors.email.message}</span>}
      <label htmlFor="password">Password</label>
      <input {...register('password')} id="password" className="mr-2 border" type="password" />
      {errors.password && <span className="text-xs text-red-400">{errors.password.message}</span>}
      <button disabled={isSubmitting}>{isSubmitting ? 'Loading...' : 'Register'}</button>
    </form>
  );
};

export default RegForm;
