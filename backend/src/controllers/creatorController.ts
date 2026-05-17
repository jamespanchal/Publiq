import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export interface Creator {
  id: string;
  userId: string;
  bio: string;
  profileImageUrl?: string;
  categories: string[];
  country: string;
  city: string;
  socialProfiles: Record<string, string>;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  totalFollowers: number;
  avgEngagementRate: number;
  totalCampaigns: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export const getCreator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Mock data
    const creator: Creator = {
      id,
      userId: 'user_123',
      bio: 'Travel and lifestyle influencer',
      profileImageUrl: 'https://via.placeholder.com/200',
      categories: ['travel', 'lifestyle', 'food'],
      country: 'IN',
      city: 'Mumbai',
      socialProfiles: {
        instagram: '@traveler_john',
        tiktok: '@john_travels',
        youtube: 'John Travels'
      },
      verificationStatus: 'verified',
      totalFollowers: 150000,
      avgEngagementRate: 4.5,
      totalCampaigns: 25,
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: creator,
      message: 'Creator profile fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch creator profile'
    });
  }
};

export const updateCreator = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { bio, categories, city, socialProfiles } = req.body;

    // Mock update
    const updatedCreator: Creator = {
      id,
      userId: req.user?.userId || 'user_123',
      bio: bio || 'Updated bio',
      categories: categories || [],
      country: 'IN',
      city: city || 'Mumbai',
      socialProfiles: socialProfiles || {},
      verificationStatus: 'verified',
      totalFollowers: 150000,
      avgEngagementRate: 4.5,
      totalCampaigns: 25,
      rating: 4.8,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: updatedCreator,
      message: 'Creator profile updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update creator profile'
    });
  }
};

export const getCreatorStats = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stats = {
      totalFollowers: 150000,
      avgEngagementRate: 4.5,
      totalCampaigns: 25,
      completedCampaigns: 23,
      activeCampaigns: 2,
      totalEarnings: 250000,
      rating: 4.8,
      reviewCount: 45
    };

    res.status(200).json({
      success: true,
      data: stats,
      message: 'Creator statistics fetched successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch creator statistics'
    });
  }
};
