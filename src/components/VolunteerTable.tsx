import React, { useState } from 'react';
import { Trash2, MessageSquare, Phone, Mail, Filter } from 'lucide-react';
import { Volunteer } from '../types';
import { api } from '../services/api';
import Modal from './Modal';

interface VolunteerTableProps {
  volunteers: Volunteer[];
  onVolunteerDeleted: (id: string) => void;
}

const sectionLabels = {
  accueil: 'Accueil',
  organisation: 'Organisation',
  sécurité: 'Sécurité',
  staff: 'Staff',
  transport: 'Transport'
};

const VolunteerTable: React.FC<VolunteerTableProps> = ({ volunteers, onVolunteerDeleted }) => {
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [loadingActions, setLoadingActions] = useState<{ [key: string]: boolean }>({});
  const [modalState, setModalState] = useState<{isOpen: boolean; title: string; message: string; onConfirm?: (inputValue?: string) => void; prompt?: boolean;}>({ 
    isOpen: false,
    title: '',
    message: '',
    onConfirm: undefined,
    prompt: false
  });

  const filteredVolunteers = volunteers.filter(volunteer =>
    selectedSection === 'all' || volunteer.section === selectedSection
  );

  const handleDelete = (id: string) => {
    const confirmDelete = async () => {
      setLoadingActions(prev => ({ ...prev, [`delete-${id}`]: true }));
      try {
        await api.deleteVolunteer(id);
        onVolunteerDeleted(id);
        setModalState({ isOpen: false, title: '', message: '', onConfirm: undefined });
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        setModalState({
            isOpen: true,
            title: 'Erreur',
            message: 'Erreur lors de la suppression du bénévole.',
            onConfirm: undefined
        });
      } finally {
        setLoadingActions(prev => ({ ...prev, [`delete-${id}`]: false }));
      }
    };

    setModalState({
        isOpen: true,
        title: 'Confirmation de suppression',
        message: 'Êtes-vous sûr de vouloir supprimer ce bénévole ?',
        onConfirm: confirmDelete
    });
  };

  const handleSendMessage = (volunteer: Volunteer, type: 'sms' | 'whatsapp' | 'email') => {
    const sendMessage = async (message?: string) => {
      if (message) {
        const actionKey = `${type}-${volunteer._id}`;
        setLoadingActions(prev => ({ ...prev, [actionKey]: true }));
        
        try {
          await api.sendMessage({
            volunteerId: volunteer._id,
            message,
            type
          });
          setModalState({
              isOpen: true,
              title: 'Succès',
              message: `Message ${type} envoyé avec succès !`,
              onConfirm: undefined,
              prompt: false
          });
        } catch (error) {
          console.error('Erreur lors de l\'envoi:', error);
          setModalState({
              isOpen: true,
              title: 'Erreur',
              message: 'Erreur lors de l\'envoi du message.',
              onConfirm: undefined,
              prompt: false
          });
        } finally {
          setLoadingActions(prev => ({ ...prev, [actionKey]: false }));
        }
      }
    };

    setModalState({
        isOpen: true,
        title: `Envoyer un ${type === 'sms' ? 'SMS' : type === 'whatsapp' ? 'WhatsApp' : 'Email'} à ${volunteer.firstName}`,
        message: `Veuillez saisir le message ci-dessous.`,
        onConfirm: sendMessage,
        prompt: true
    });
  };

  const getSectionCount = (section: string) => {
    return volunteers.filter(v => v.section === section).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Bénévoles inscrits ({filteredVolunteers.length})
          </h3>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les sections ({volunteers.length})</option>
              {Object.entries(sectionLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label} ({getSectionCount(value)})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bénévole
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dénomination
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredVolunteers.map((volunteer) => (
              <tr key={volunteer._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {volunteer.firstName} {volunteer.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Inscrit le {new Date(volunteer.registeredAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {volunteer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {volunteer.denomination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {sectionLabels[volunteer.section]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {volunteer.isBornAgain ? (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Né de nouveau
                    </span>
                  ) : (
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      -
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleSendMessage(volunteer, 'sms')}
                      disabled={loadingActions[`sms-${volunteer._id}`]}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors disabled:opacity-50"
                      title="Envoyer SMS"
                    >
                      <Phone className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSendMessage(volunteer, 'whatsapp')}
                      disabled={loadingActions[`whatsapp-${volunteer._id}`]}
                      className="text-green-600 hover:text-green-900 p-1 rounded transition-colors disabled:opacity-50"
                      title="Envoyer WhatsApp"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleSendMessage(volunteer, 'email')}
                      disabled={loadingActions[`email-${volunteer._id}`]}
                      className="text-purple-600 hover:text-purple-900 p-1 rounded transition-colors disabled:opacity-50"
                      title="Envoyer Email"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(volunteer._id)}
                      disabled={loadingActions[`delete-${volunteer._id}`]}
                      className="text-red-600 hover:text-red-900 p-1 rounded transition-colors disabled:opacity-50"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredVolunteers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun bénévole trouvé pour cette section.</p>
        </div>
      )}

      <Modal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ isOpen: false, title: '', message: '', onConfirm: undefined, prompt: false })} 
        title={modalState.title}
        onConfirm={modalState.onConfirm}
        prompt={modalState.prompt}
      >
        <p>{modalState.message}</p>
      </Modal>
    </div>
  );
};

export default VolunteerTable;