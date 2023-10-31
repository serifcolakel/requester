import { Outlet } from 'react-router-dom';

import EnvironmentNavbar from '@components/environment-navbar';

export default function Environment() {
  return (
    <div className="flex flex-row w-full h-screen divide-x-2">
      <EnvironmentNavbar />
      <div className="w-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
