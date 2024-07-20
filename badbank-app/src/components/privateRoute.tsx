import React from 'react';
import { Route, redirect, RouteProps } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atoms/userAtom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const user = useAtomValue(userAtom);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
