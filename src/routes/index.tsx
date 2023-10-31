import { Route, Routes as RouterRoutes } from 'react-router-dom';

import EnvironmentPage from '@pages/environment';
import EnvironmentDetail from '@pages/environment-detail';
import Home from '@pages/home';
import Login from '@pages/login';
import Register from '@pages/register';

import Environment from '@layouts/environment-layout';

import Protected from '@providers/Protected';

import paths from './paths';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route
        element={
          <Protected>
            <Home />
          </Protected>
        }
        path={paths.home}
      />
      <Route index element={<Login />} path={paths.login} />
      <Route element={<Register />} path={paths.register} />

      <Route
        element={
          <Protected>
            <Environment />
          </Protected>
        }
        path={paths.environment}
      >
        <Route
          index
          element={
            <Protected>
              <EnvironmentPage />
            </Protected>
          }
        />
        <Route
          element={
            <Protected>
              <EnvironmentDetail />
            </Protected>
          }
          path={paths.environmentDetail}
        />
      </Route>
    </RouterRoutes>
  );
}
