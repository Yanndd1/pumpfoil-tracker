import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    {
      title: '1. Données auxquelles nous accédons',
      content: 'Nous accédons à vos activités Strava taguées "Kitesurf" ou "Kitesurfing" pour analyser vos sessions de pumpfoil. Nous demandons un accès en lecture seule à vos activités et ne modifions aucune donnée sur Strava.'
    },
    {
      title: '2. Comment nous utilisons vos données',
      content: 'Vos données d\'activité sont utilisées uniquement pour vous fournir des analyses de sessions, incluant la détection de tours, les statistiques de vitesse et le suivi de progression. Nous utilisons des algorithmes mathématiques (pas d\'IA ni de machine learning) pour détecter les tours à partir de vos données GPS.'
    },
    {
      title: '3. Stockage des données',
      content: 'Toutes vos données sont stockées localement dans votre navigateur (localStorage). Nous ne stockons pas vos données sur un serveur externe. Vos tokens Strava sont stockés localement et sont uniquement utilisés pour communiquer avec l\'API Strava en votre nom.'
    },
    {
      title: '4. Partage des données',
      content: 'Nous ne partageons, vendons ou transférons pas vos données personnelles à des tiers. Vos données ne sont visibles que par vous (mode single-player).'
    },
    {
      title: '5. Conservation des données',
      content: 'Vos données restent dans votre navigateur jusqu\'à ce que vous les effaciez. Vous pouvez supprimer toutes vos données à tout moment depuis la page Paramètres. Nous rafraîchissons les données de Strava à chaque synchronisation et ne mettons pas en cache les données au-delà de ce qui est nécessaire au fonctionnement de l\'application.'
    },
    {
      title: '6. Vos droits',
      content: 'Vous pouvez révoquer l\'accès de Pumpfoil Tracker à vos données Strava à tout moment depuis vos paramètres Strava (Paramètres > Mes Applications). Vous pouvez également supprimer toutes les données locales depuis la page Paramètres de l\'application.'
    },
    {
      title: '7. Contact',
      content: 'Pour toute question concernant cette politique de confidentialité, veuillez nous contacter via GitHub.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-ocean-600 hover:text-ocean-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Link>
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-ocean-600" />
            <h1 className="text-3xl font-bold text-gray-900">Politique de Confidentialité</h1>
          </div>
          <p className="text-gray-500 mt-2">Dernière mise à jour : Janvier 2025</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <p className="text-gray-700 mb-6">
            Pumpfoil Tracker respecte votre vie privée. Cette politique explique comment nous traitons vos données.
          </p>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  {section.title}
                </h2>
                <p className="text-gray-600">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Pumpfoil Tracker &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
