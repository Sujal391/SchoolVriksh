// src/components/layout/Layout.js
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  if (!user) return children;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Header user={user} logout={logout} /> */}
      <div className="flex">
        {/* <Sidebar role={user.role} /> */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;


