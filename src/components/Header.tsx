import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('adminToken');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">Ebenezer 4</h1>
              <p className="text-sm text-gray-600">Inscription Bénévoles</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-4">
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Accueil
              </Link>
            )}
            
            {/* {!isAdmin && location.pathname !== '/login' && (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Admin
              </Link>
            )} */}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;