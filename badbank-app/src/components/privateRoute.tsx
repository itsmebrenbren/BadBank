import React from 'react';
import { Route, Routes, RouteProps, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from './atoms/userAtom';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  path: string;
  element?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const user = useAtomValue(userAtom);

  return (
    <Routes>
      <Route
        {...rest}
        element={user ? <Component /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default PrivateRoute;


