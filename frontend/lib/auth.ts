import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    refreshToken: string;
    user: any;
  };
  message: string;
}

class AuthService {
  async register(email: string, password: string, firstName: string, lastName: string, userType: string = 'creator') {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
        email,
        password,
        firstName,
        lastName,
        userType
      });
      
      if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      if (response.data.data) {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}

export default new AuthService();
