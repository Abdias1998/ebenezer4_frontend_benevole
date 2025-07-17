import axios, { InternalAxiosRequestConfig } from 'axios';
import { Volunteer, LoginCredentials, MessageRequest, LoginApiResponse } from '../types';

// Configuration de l'instance Axios
const apiClient = axios.create({
  baseURL: 'https://ebenezer4-backend-benevole.onrender.com/api',
});

// Intercepteur pour ajouter le token JWT à chaque requête
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Inscription d'un bénévole
    registerVolunteer: async (volunteerData: Omit<Volunteer, '_id' | 'registeredAt'>): Promise<Volunteer> => {
    const response = await apiClient.post<Volunteer>('/volunteers', volunteerData);
    return response.data;
  },

  // Connexion admin
  adminLogin: async (credentials: LoginCredentials): Promise<{ token: string }> => {
        const response = await apiClient.post<LoginApiResponse>('/auth/login', credentials);
    const token = response.data?.data?.access_token;
    if (token) {
      localStorage.setItem('token', token);
      return { token };
    }
    // If no token is found, throw an error to be caught by the calling component
    throw new Error('Login failed: No token received');
  },

  // Récupération des bénévoles
  getVolunteers: async (): Promise<Volunteer[]> => {
    const response = await apiClient.get<{ data: Volunteer[] }>('/volunteers');
    return response.data.data;
  },

  // Suppression d'un bénévole
  deleteVolunteer: async (id: string): Promise<void> => {
    await apiClient.delete(`/volunteers/${id}`);
  },

  // Envoi de messages
  sendMessage: async (request: MessageRequest): Promise<void> => {
    await apiClient.post('/messages/send', request);
  },

  // Déconnexion admin
  adminLogout: (): Promise<void> => {
    return new Promise((resolve) => {
        localStorage.removeItem('token');
        resolve();
    });
  }
};