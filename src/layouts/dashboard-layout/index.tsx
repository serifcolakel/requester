import { BiCollection } from 'react-icons/bi';
import { NavLink, Outlet } from 'react-router-dom';
import { GalleryThumbnails } from 'lucide-react';

import paths from '@routes/paths';

export default function DashboardLayout() {
  return (
    <div className="flex flex-row w-full h-screen divide">
      <nav className="flex bg-gray-50 flex-col w-24 border-r p-[3px] gap-y-2 py-4 dark:bg-gray-800 dark:border-gray-600">
        <NavLink
          className={({ isActive }) => `
            flex items-center flex-col justify-between gap-y-2 p-2 rounded-md text-xs
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-colors duration-300 ease-in-out
            dark:text-gray-100 text-muted-foreground
            ${isActive && 'bg-gray-200 dark:bg-gray-700'}
          `}
          to={paths.collections}
        >
          <BiCollection className="w-5 h-5" />
          Collections
        </NavLink>
        <NavLink
          className={({ isActive }) => `
            flex items-center flex-col justify-between gap-y-2 p-2 rounded-md text-xs
            hover:bg-gray-100 dark:hover:bg-gray-700
            transition-colors duration-300 ease-in-out
            dark:text-gray-100 text-muted-foreground
            ${isActive && 'bg-gray-200 dark:bg-gray-700'}
          `}
          to={paths.environments}
        >
          <GalleryThumbnails />
          Environments
        </NavLink>
      </nav>
      <div className="w-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
