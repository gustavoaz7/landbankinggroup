import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEYS } from './constants';

export const ProtectedRoute: FC<{children: ReactNode}> = ({ children }) => {
  const [ loggedUser ] = useLocalStorage(STORAGE_KEYS.LOGGED_USER, '')

    if (!loggedUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
