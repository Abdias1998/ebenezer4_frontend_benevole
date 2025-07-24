import React, { useState, useEffect } from 'react';
import VolunteerForm from '../components/VolunteerForm';

const HomePage: React.FC = () => {
  const [showMaintenance, setShowMaintenance] = useState(false);

  useEffect(() => {
    // You can add logic here to check maintenance status from an API if needed
  }, []);

  if (showMaintenance) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🚧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maintenance en cours</h2>
          <p className="text-gray-600 mb-6">
           La plateforme d'inscription des volontaires est actuellement en maintenance. Veuillez revenir dans environ 15 minutes.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Merci de votre compréhension.
          </p>
          <button
            onClick={() => setShowMaintenance(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Je comprends
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue à <span className="text-yellow-600">Ebenezer 4</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez notre équipe de volontaires d'Ebenezer 4
          </p>
          {/* <div className="flex items-center justify-center space-x-8 text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Événement chrétien</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Inscription gratuite</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Formation incluse</span>
            </div>
          </div> */}
        </div>

        <VolunteerForm />

        {/* <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Sections disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Accueil', icon: '👋', description: 'Accueillir les participants' },
              { name: 'Organisation', icon: '📋', description: 'Coordination événement' },
              { name: 'Sécurité', icon: '🛡️', description: 'Sécurité et ordre public' },
              { name: 'Staff', icon: '👥', description: 'Équipe générale' },
              { name: 'Transport', icon: '🚐', description: 'Logistique transport' }
            ].map((section) => (
              <div key={section.name} className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="text-3xl mb-2">{section.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{section.name}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
              </div>
            ))}
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default HomePage;