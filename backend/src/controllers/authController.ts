import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  body: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    userType?: 'creator' | 'venue' | 'admin';
  };
}

interface AuthResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken: string;
    user: any;
  };
  message: string;
}

export const register = async (req: AuthRequest, res: Response<AuthResponse>) => {
  try {
    const { email, password, firstName, lastName, userType = 'creator' } = req.body;

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, firstName, and lastName are required'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (mock implementation)
    const user = {
      id: 'user_' + Date.now(),
      email,
      firstName,
      lastName,
      userType,
      isVerified: false,
      createdAt: new Date()
    };

    // Generate tokens
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        refreshToken,
        user
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
};

export const login = async (req: AuthRequest, res: Response<AuthResponse>) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Mock user retrieval (replace with DB query)
    const user = {
      id: 'user_123',
      email,
      firstName: 'John',
      lastName: 'Doe',
      userType: 'creator',
      isVerified: true
    };

    // Generate tokens
    const token = jwt.sign(
      { userId: user.id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || '30d' }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        refreshToken,
        user
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

export const refreshToken = async (req: Request, res: Response<AuthResponse>) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'refresh_secret'
    ) as any;

    const token = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    res.status(200).json({
      success: true,
      data: {
        token,
        refreshToken,
        user: { userId: decoded.userId }
      },
      message: 'Token refreshed successfully'
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
};
