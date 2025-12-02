import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/Productmanagement';
import CustomerManagement from './pages/Customermanagement';
import OrderManagement from './pages/Ordermanagement'; 

const MainApp = () => {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

 
  if (!user) {
    return <AuthPage />;
  }

 
  return (
    <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'products' && <ProductManagement />}
      {activePage === 'orders' && <OrderManagement />} 
      {activePage === 'customers' && <CustomerManagement />}
    </DashboardLayout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
};

export default App;

