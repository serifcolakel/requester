import { Outlet } from 'react-router-dom';

export default function Container() {
  return (
    <div className="flex flex-row w-full h-screen divide-x-2">
      <nav className="flex flex-col w-64 px-12 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        124124124
      </nav>
      <div className="overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
