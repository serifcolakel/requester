import { Route, Routes as RouterRoutes } from 'react-router-dom';

import EnvironmentPage from '@pages/environment';
import EnvironmentDetail from '@pages/environment-detail';
import Home from '@pages/home';
import Login from '@pages/login';
import Register from '@pages/register';

import CollectionLayout from '@layouts/collection-layout';
import DashboardLayout from '@layouts/dashboard-layout';
import Environment from '@layouts/environment-layout';

import Protected from '@providers/Protected';

import paths from './paths';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route element={<Home />} path={paths.home} />
      <Route index element={<Login />} path={paths.login} />
      <Route element={<Register />} path={paths.register} />

      {/* Protected Routes */}
      <Route
        element={
          <Protected>
            <DashboardLayout />
          </Protected>
        }
        path={paths.dashboard}
      >
        <Route
          element={
            <Protected>
              <CollectionLayout />
            </Protected>
          }
          path={paths.collections}
        >
          <Route index element={<Protected>aaa14124</Protected>} />
        </Route>

        <Route
          element={
            <Protected>
              <Environment />
            </Protected>
          }
          path={paths.environments}
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
      </Route>
    </RouterRoutes>
  );
}
