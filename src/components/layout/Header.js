// src/components/layout/Header.js
import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ user, logout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-indigo-600">
                SchoolVriksh
              </Link>
            </div>
          </div>
          <div className="ml-6 flex items-center">
            {user && (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  {user.name} ({user.role})
                </div>
                {user.school && (
                  <div className="text-sm text-gray-500">
                    {user.school.name}
                  </div>
                )}
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;