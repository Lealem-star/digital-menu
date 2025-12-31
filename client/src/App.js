import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/nav';
import HomePage from './customer/HomePage';
import InfoCards from './components/InfoCards';
import Footer from './components/Footer';
import AdminPage from './admin/AdminPage';
import AdminLayout from './admin/AdminLayout';
import LoginPage from './admin/LoginPage';
import AddFoodItemPage from './admin/AddFoodItemPage';

function App() {
  const isAuthed = Boolean(localStorage.getItem('token'));
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  const shouldHideNavAndFooter = isAdminRoute || isLoginPage;

  return (
    <div className="App">
      {!shouldHideNavAndFooter && <Nav />}
      <main style={{ padding: '1rem' }} className="drop-in">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={isAuthed ? <AdminLayout /> : <Navigate to="/login" replace />}>
            <Route index element={<AdminPage />} />
            <Route path="add-food-item" element={<AddFoodItemPage />} />
          </Route>
        </Routes>
      </main>
      {!shouldHideNavAndFooter && <InfoCards />}
      {!shouldHideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
