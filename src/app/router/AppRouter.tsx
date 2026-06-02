import { Navigate, Route, Routes } from 'react-router';
import AuthLayout from '../../components/layouts/AuthLayout';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import DashboardPage from '../../pages/DashboardPage';
import OrderDetailPage from '../../pages/OrderDetailPage';
import OrdersPage from '../../pages/OrdersPage';
import LoginPage from '../../pages/LoginPage';
import NotFoundPage from '../../pages/NotFoundPage';
import RegisterPage from '../../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';
import ClientsPage from '../../pages/ClientsPage';
import ClientDetailPage from '../../pages/ClientDetailPage';
import CreateClientPage from '../../pages/CreateClientPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route
            element={
              <ProtectedRoute
                allowedRoles={['admin', 'photographyCompany']}
                redirectPath="/dashboard"
              />
            }
          >
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/clients/:id" element={<ClientDetailPage />} />
            <Route path="/clients/create" element={<CreateClientPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}