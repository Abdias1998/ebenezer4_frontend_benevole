import React from 'react';
import VolunteerForm from '../components/VolunteerForm';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenue à <span className="text-blue-600">Ebenezer 4</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Rejoignez notre équipe de bénévoles d'Ebenezer 4
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