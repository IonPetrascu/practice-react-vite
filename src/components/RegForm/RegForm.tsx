import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router';
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-5 space-y-1">
        <h2 className="text-lg font-semibold text-white">Регистрация</h2>
        <p className="text-sm text-zinc-400">Создайте аккаунт, чтобы начать работу</p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-zinc-200">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="name@example.com"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
        />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-zinc-200">
          Пароль
        </label>
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white transition outline-none placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-500/20"
        />
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-100 focus:ring-2 focus:ring-white/30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Загрузка...' : 'Создать аккаунт'}
      </button>

      <p className="pt-1 text-center text-sm text-zinc-500">
        Уже есть аккаунт?{' '}
        <Link to="/auth/login" className="text-zinc-300 underline-offset-4 hover:underline">
          Войти
        </Link>
      </p>
    </form>
  );
};

export default RegForm;
