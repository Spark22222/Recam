import { Navigate, Route, Routes } from 'react-router';
import AuthLayout from '../../layouts/AuthLayout';
import DashboardLayout from '../../layouts/DashboardLayout';
import DashboardPage from '../../pages/DashboardPage';
import ListingCaseDetailPage from '../../pages/ListingCaseDetailPage';
import ListingCasesPage from '../../pages/ListingCasesPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RegisterPage from '../../pages/RegisterPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/listing-cases" element={<ListingCasesPage />} />
        <Route path="/listing-cases/:id" element={<ListingCaseDetailPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}