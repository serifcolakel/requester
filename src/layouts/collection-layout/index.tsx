import { Outlet } from 'react-router-dom';

export default function CollectionLayout() {
  return (
    <div className="flex flex-row w-full h-screen divide-x">
      124124124
      <div className="w-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </div>
  );
}
