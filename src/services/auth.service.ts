import { LoginFormData } from '@/lib/validations/auth';
import { Cookies } from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    emailVerified: boolean;
    createdAt: string;
  };
}

export const authService = {
  async register(data: LoginFormData & { name: string }): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const result = await response.json();
    this.setTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async login(data: LoginFormData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();
    this.setTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async loginWithGoogle(): Promise<void> {
    window.location.href = `${API_URL}/auth/google`;
  },

  async refresh(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Token refresh failed');
    }

    const result = await response.json();
    this.setTokens(result.accessToken, result.refreshToken);
    return result;
  },

  async me(): Promise<{ user: AuthResponse['user'] }> {
    const token = this.getToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get user profile');
    }

    return response.json();
  },

  setTokens(accessToken: string, refreshToken: string): void {
    // Set cookies with path and expiry
    document.cookie = `accessToken=${accessToken}; path=/; max-age=900; SameSite=Lax`; // 15 minutes
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; SameSite=Lax`; // 7 days
  },

  getToken(): string | null {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find(cookie => cookie.trim().startsWith('accessToken='));
    return accessTokenCookie ? accessTokenCookie.split('=')[1] : null;
  },

  removeTokens(): void {
    // Remove cookies
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  },

  async forgotPassword(email: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reset email');
    }
  },

  async resetPassword(token: string, password: string): Promise<void> {
    const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }
  },

  async updateProfile(data: { name: string; email: string; bio?: string }): Promise<AuthResponse> {
    const token = this.getToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    return response.json();
  },

  async getProfile(): Promise<{ user: AuthResponse['user'] }> {
    const token = this.getToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get profile');
    }

    return response.json();
  },

  async changeEmail(data: { newEmail: string; password: string }): Promise<void> {
    const token = this.getToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_URL}/auth/change-email`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change email');
    }
  },

  async changePassword(data: { currentPassword: string; newPassword: string }): Promise<void> {
    const token = this.getToken();
    if (!token) throw new Error('No access token');

    const response = await fetch(`${API_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to change password');
    }
  },
}; 