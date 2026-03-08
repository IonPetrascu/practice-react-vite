import { Outlet } from 'react-router';
import { AppSidebar } from '@/components/AppSidebar/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-zinc-950">
        <div className="border-b border-zinc-800 px-4 py-3">
          <SidebarTrigger className="text-zinc-400 hover:text-white" />
        </div>
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
