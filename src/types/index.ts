export interface Volunteer {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  // denomination: string;
  section: 'accueil' | 'organisation' | 'sécurité' | 'staff' | 'transport';
  // isBornAgain: boolean;
  registeredAt: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface MessageRequest {
  volunteerId: string;
  message: string;
  type: 'sms' | 'whatsapp' | 'email';
}

export interface Admin {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponseData {
  access_token: string;
  admin: Admin;
}

export interface LoginApiResponse {
  success: boolean;
  message: string;
  data: LoginResponseData;
}