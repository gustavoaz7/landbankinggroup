import { FC } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import { LoginPage } from './pages/login';
import { ProtectedRoute } from './ProtectedRoute';
import { HomePage } from './pages/home';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
