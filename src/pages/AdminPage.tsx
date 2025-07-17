import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Users, BarChart3, RefreshCw } from 'lucide-react';
import { api } from '../services/api';
import { Volunteer } from '../types';
import VolunteerTable from '../components/VolunteerTable';

const AdminPage: React.FC = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = localStorage.getItem('token');

  const loadVolunteers = async () => {
    setIsLoading(true);
    try {
      const data = await api.getVolunteers();
      setVolunteers(data);
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadVolunteers();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const handleVolunteerDeleted = (id: string) => {
    setVolunteers(prev => prev.filter(v => v._id !== id));
  };

  const getStatsCards = () => {
    const totalVolunteers = volunteers.length;
    const bornAgainCount = volunteers.filter(v => v.isBornAgain).length;
    const sectionCounts = volunteers.reduce((acc, volunteer) => {
      acc[volunteer.section] = (acc[volunteer.section] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        title: 'Total Bénévoles',
        value: totalVolunteers,
        icon: Users,
        color: 'blue'
      },
      {
        title: 'Chrétiens nés de nouveau',
        value: bornAgainCount,
        percentage: totalVolunteers > 0 ? Math.round((bornAgainCount / totalVolunteers) * 100) : 0,
        icon: BarChart3,
        color: 'green'
      },
      {
        title: 'Section la plus demandée',
        value: Object.entries(sectionCounts).reduce((a, b) => sectionCounts[a[0]] > sectionCounts[b[0]] ? a : b, ['', 0])[0] || '-',
        count: Object.values(sectionCounts).reduce((max, count) => Math.max(max, count), 0),
        icon: BarChart3,
        color: 'yellow'
      }
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administration</h1>
          <p className="text-gray-600">Gestion des bénévoles Ebenezer 4</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {getStatsCards().map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                    {stat.percentage && (
                      <span className="text-sm text-gray-500 ml-1">({stat.percentage}%)</span>
                    )}
                    {stat.count && (
                      <span className="text-sm text-gray-500 ml-1">({stat.count})</span>
                    )}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                  <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={loadVolunteers}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Actualiser</span>
            </button>
            <button
              onClick={() => {
                const csvContent = [
                  ['Prénom', 'Nom', 'Téléphone', 'Dénomination', 'Section', 'Né de nouveau', 'Date inscription'],
                  ...volunteers.map(v => [
                    v.firstName,
                    v.lastName,
                    v.phone,
                    v.denomination,
                    v.section,
                    v.isBornAgain ? 'Oui' : 'Non',
                    new Date(v.registeredAt).toLocaleDateString('fr-FR')
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csvContent], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'benevoles-ebenezer4.csv';
                a.click();
              }}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <span>Exporter CSV</span>
            </button>
          </div>
        </div>

        {/* Table des bénévoles */}
        <VolunteerTable 
          volunteers={volunteers} 
          onVolunteerDeleted={handleVolunteerDeleted} 
        />
      </div>
    </div>
  );
};

export default AdminPage;