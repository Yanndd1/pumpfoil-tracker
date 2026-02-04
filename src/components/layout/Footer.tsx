import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Made with love */}
          <p className="text-sm text-gray-500">Made with ❤️ in Corbière en Provence</p>

          {/* Powered by Strava */}
          <a
            href="https://www.strava.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/strava-powered-by.svg"
              alt="Powered by Strava"
              className="h-6"
            />
          </a>

          {/* Privacy Policy */}
          <Link
            to="/privacy"
            className="text-sm text-gray-500 hover:text-ocean-600 transition-colors"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
