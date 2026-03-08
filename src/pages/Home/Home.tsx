import { Github } from 'lucide-react';

const frontendStack = [
  'React 19',
  'TypeScript 5.9',
  'Vite 7',
  'Tailwind CSS v4',
  'Zustand',
  'React Hook Form',
  'Zod',
  'Axios',
  'Docker',
];

const backendStack = [
  'Node.js',
  'Express',
  'TypeScript',
  'PostgreSQL',
  'Prisma',
  'Zod 4',
  'bcryptjs',
  'connect-pg-simple',
  'Docker',
];

const Home = () => {
  return (
    <div className="h-full overflow-auto">
      <div className="mx-auto max-w-2xl px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-zinc-400">Учебный проект</span>
          </div>
          <h1 className="mb-1 text-3xl font-semibold tracking-tight text-white">Ion Petrașcu</h1>
          <p className="mb-3 text-base text-zinc-400">Frontend Developer</p>
          <p className="text-sm leading-relaxed text-zinc-600">
            Проект создан для практики современного fullstack-стека. Реализован таск-менеджер с
            колонками и карточками, drag-and-drop, авторизацией и CI/CD деплоем.
          </p>
        </div>

        {/* Tech stacks */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium tracking-widest text-zinc-500 uppercase">
              Frontend
            </p>
            <div className="flex flex-wrap gap-1.5">
              {frontendStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
            <p className="mb-3 text-xs font-medium tracking-widest text-zinc-500 uppercase">
              Backend
            </p>
            <div className="flex flex-wrap gap-1.5">
              {backendStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CI/CD */}
        <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900 p-4">
          <p className="mb-2 text-xs font-medium tracking-widest text-zinc-500 uppercase">
            CI / CD
          </p>
          <p className="text-sm leading-relaxed text-zinc-400">
            На VPS поднят self-hosted GitHub Actions runner. При каждом пуше в ветку{' '}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">master</code>{' '}
            автоматически запускается пайплайн — Docker собирает образ и деплоит обновлённый
            контейнер без ручного вмешательства.
          </p>
        </div>

        {/* GitHub links */}
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/IonPetrascu/practice-react-vite"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
          >
            <Github size={15} className="shrink-0 text-zinc-400" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-200">Frontend</p>
              <p className="truncate text-xs text-zinc-500">
                github.com/IonPetrascu/practice-react-vite
              </p>
            </div>
          </a>
          <a
            href="https://github.com/IonPetrascu/backend"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
          >
            <Github size={15} className="shrink-0 text-zinc-400" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-200">Backend</p>
              <p className="truncate text-xs text-zinc-500">github.com/IonPetrascu/backend</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
