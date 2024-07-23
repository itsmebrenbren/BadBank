// src/components/protectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { authAtom, loadingAtom } from './atoms/authAtom';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useAtomValue(authAtom);
  const loading = useAtomValue(loadingAtom);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;






