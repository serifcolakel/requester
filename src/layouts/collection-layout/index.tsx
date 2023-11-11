import { Outlet } from 'react-router-dom';

import CollectionNavbar from '@components/collection-navbar';

export default function CollectionLayout() {
  return (
    <div className="flex flex-row w-full h-full divide-x">
      <CollectionNavbar />
      <div className="w-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
