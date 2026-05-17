import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export interface Venue {
  id: string;
  userId: string;
  name: string;
  description: string;
  logoUrl?: string;
  category: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  website?: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  rating: number;
  totalCampaigns: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getVenue = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const venue: Venue = {
      id,
      userId: 'user_456',
      name: 'The Grand Cafe',
      description: 'Premium dining experience in Mumbai',
      logoUrl: 'https://via.placeholder.com/200',
      category: 'restaurant',
      country: 'IN',
      city: 'Mumbai',
      address: '123 Main St, Mumbai, India',
      phone: '+91 9876543210',
      website: 'www.thegrandcafe.com',
      verificationStatus: 'verified',
      rating: 4.6,
      totalCampaigns: 42,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: venue,
      message: 'Venue profile fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch venue profile'
    });
  }
};

export const createVenue = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, description, category, city, address, phone, website } = req.body;

    const venue: Venue = {
      id: 'venue_' + Date.now(),
      userId: req.user?.userId || 'user_456',
      name,
      description,
      category,
      country: 'IN',
      city,
      address,
      phone,
      website,
      verificationStatus: 'pending',
      rating: 0,
      totalCampaigns: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(201).json({
      success: true,
      data: venue,
      message: 'Venue created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create venue'
    });
  }
};

export const updateVenue = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, city, address, phone, website } = req.body;

    const updatedVenue: Venue = {
      id,
      userId: req.user?.userId || 'user_456',
      name: name || 'Updated Venue',
      description: description || '',
      category: category || 'restaurant',
      country: 'IN',
      city: city || 'Mumbai',
      address: address || '',
      phone: phone || '',
      website: website || '',
      verificationStatus: 'verified',
      rating: 4.6,
      totalCampaigns: 42,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: updatedVenue,
      message: 'Venue updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update venue'
    });
  }
};
