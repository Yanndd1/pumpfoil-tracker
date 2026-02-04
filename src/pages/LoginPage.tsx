import React from 'react';
import { Link } from 'react-router-dom';
import { Waves, Activity, TrendingUp, Target, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();

  const features = [
    {
      icon: Activity,
      title: 'Import automatique',
      description: 'Synchronisez vos sessions depuis Strava',
    },
    {
      icon: Target,
      title: 'Détection des tours',
      description: "Analyse automatique avec des règles mathématiques",
    },
    {
      icon: TrendingUp,
      title: 'Suivi de progression',
      description: 'Visualisez vos progrès au fil du temps',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-500 to-ocean-700 flex flex-col">
      {/* Made with love banner */}
      <div className="bg-ocean-600 text-white text-center py-1 text-xs font-medium">
        <span className="flex items-center justify-center gap-1">
          Made with <Heart className="h-3 w-3 fill-current text-red-300" /> in Corbière en Provence
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
            <Waves className="h-10 w-10 text-ocean-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Pumpfoil Tracker</h1>
          <p className="text-ocean-100 text-lg max-w-md">
            Suivez vos progrès en pumpfoil et analysez chaque tour de pump
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl w-full">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-ocean-100 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Login button */}
        <button
          onClick={login}
          disabled={isLoading}
          className="flex items-center space-x-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="currentColor"
          >
            <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 4.116z" fill="#FC4C02"/>
            <path d="M11.166 0L7.31 7.657h3.31L11.166 0z" fill="#FC4C02"/>
            <path d="M14.29 7.657h3.31L14.29 0l-1.545 3.832L14.29 7.657z" fill="#FC4C02"/>
          </svg>
          <span>Se connecter avec Strava</span>
        </button>

        <p className="mt-6 text-ocean-200 text-sm">
          Nous recherchons vos sessions Pumpfoil enregistrées comme Kitesurf sur Strava
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 space-y-3">
        <p className="text-ocean-200 text-sm">Compatible avec les montres Garmin via Strava</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/privacy"
            className="text-ocean-200 hover:text-white text-sm underline transition-colors"
          >
            Politique de confidentialité
          </Link>
          <span className="text-ocean-300">|</span>
          <a
            href="https://www.strava.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-ocean-200 hover:text-white text-sm transition-colors"
          >
            <img
              src="/strava-powered-by.svg"
              alt="Powered by Strava"
              className="h-5"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
