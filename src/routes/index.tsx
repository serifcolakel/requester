import { Route, Routes as RouterRoutes } from 'react-router-dom';

import Home from '@pages/home';
import Login from '@pages/login';
import Register from '@pages/register';

import paths from './paths';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route index element={<Home />} path={paths.home} />
      <Route index element={<Login />} path={paths.login} />
      <Route index element={<Register />} path={paths.register} />
    </RouterRoutes>
  );
}
