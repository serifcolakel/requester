import { Link } from 'react-router-dom';

import paths from '@routes/paths';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-zinc-900">
      Home Page
      <Link to={paths.login}>Login</Link>
    </div>
  );
}
