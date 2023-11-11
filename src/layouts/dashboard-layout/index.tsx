import { BiCollection } from 'react-icons/bi';
import { Link, NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import { GalleryThumbnails } from 'lucide-react';

import { ModeToggle } from '@components/mode-toogle';
import { Notifications } from '@components/notifications';

import paths from '@routes/paths';

import { Logo } from '@assets/Icons';

const links = [
  {
    name: 'Collections',
    path: paths.collections,
    icon: BiCollection,
  },
  {
    name: 'Environments',
    path: paths.environments,
    icon: GalleryThumbnails,
  },
];

export default function DashboardLayout() {
  return (
    <div className="flex flex-col w-screen h-screen bg-white dark:bg-zinc-900">
      <nav className="flex items-center justify-between px-6 py-2 border-b border-zinc-200 dark:border-zinc-800">
        <Link className="flex items-center space-x-2" to={paths.dashboard}>
          <Logo className="p-2 text-white rounded-full bg-primary" size={60} />
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Notifications />
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside className="flex flex-col w-24 overflow-auto border-r bg-gray-50 border-zinc-200 dark:border-zinc-800">
          <nav className="flex flex-col gap-4 px-1 py-4 gap-y-2">
            {links.map(({ name, path, icon: Icon }) => (
              <NavLink
                className={({ isActive }) =>
                  clsx(
                    'flex items-center flex-col justify-between gap-y-2 p-2 rounded-md text-xs',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    'transition-colors duration-300 ease-in-out',
                    'dark:text-gray-100 text-muted-foreground',
                    isActive && 'bg-gray-200 dark:bg-gray-700'
                  )
                }
                key={path}
                to={path}
              >
                <Icon className="w-5 h-5" />
                {name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      <footer className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 dark:border-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © 2023 Requester
        </p>
        <nav className="flex items-center space-x-4">
          <Link
            className="text-sm text-zinc-500 dark:text-zinc-400"
            to={paths.dashboard}
          >
            Terms
          </Link>
          <Link
            className="text-sm text-zinc-500 dark:text-zinc-400"
            to={paths.dashboard}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
