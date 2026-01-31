import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Waves, BarChart3, Settings, User, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, athlete, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/sessions', label: 'Sessions', icon: Waves },
    { path: '/settings', label: 'Paramètres', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 safe-area-top">
      {/* Made with love banner */}
      <div className="bg-ocean-500 text-white text-center py-1 text-xs font-medium">
        <span className="flex items-center justify-center gap-1">
          Made with <Heart className="h-3 w-3 fill-current text-red-300" /> in Corbière en Provence
        </span>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-ocean-500 p-2 rounded-lg">
              <Waves className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Pumpfoil Tracker
            </span>
          </Link>

          {/* Navigation */}
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-1">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-ocean-50 text-ocean-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* User menu */}
          {isAuthenticated && athlete && (
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                {athlete.profile_medium ? (
                  <img
                    src={athlete.profile_medium}
                    alt={athlete.firstname}
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-ocean-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-ocean-600" />
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700">
                  {athlete.firstname}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isAuthenticated && (
        <nav className="md:hidden border-t border-gray-200 bg-white">
          <div className="flex justify-around">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center py-3 px-4 text-xs font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-ocean-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
