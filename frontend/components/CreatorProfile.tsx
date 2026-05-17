'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Creator {
  id: string;
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
}

interface CreatorProfileProps {
  creatorId: string;
}

export default function CreatorProfile({ creatorId }: CreatorProfileProps) {
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchCreator = async () => {
      try {
        const response = await axios.get(`/api/creators/${creatorId}`);
        setCreator(response.data.data);

        const statsResponse = await axios.get(`/api/creators/${creatorId}/stats`);
        setStats(statsResponse.data.data);
      } catch (error) {
        console.error('Failed to fetch creator:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreator();
  }, [creatorId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!creator) return <div className="text-center py-8">Creator not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 rounded-lg mb-4"></div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src={creator.profileImageUrl || 'https://via.placeholder.com/150'}
              alt={creator.bio}
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">Creator Profile</h1>
              {creator.verificationStatus === 'verified' && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">✓ Verified</span>
              )}
            </div>
            <p className="text-gray-600 mb-4">{creator.bio}</p>
            <div className="flex gap-4 mb-4">
              <div>
                <p className="text-gray-500 text-sm">Location</p>
                <p className="font-semibold">{creator.city}, {creator.country}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Categories</p>
                <p className="font-semibold">{creator.categories.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Followers</p>
            <p className="text-2xl font-bold">{(stats.totalFollowers / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Engagement</p>
            <p className="text-2xl font-bold">{stats.avgEngagementRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Campaigns</p>
            <p className="text-2xl font-bold">{stats.completedCampaigns}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-gray-500 text-sm">Rating</p>
            <p className="text-2xl font-bold">⭐ {stats.rating}</p>
          </div>
        </div>
      )}

      {/* Social Profiles */}
      {Object.keys(creator.socialProfiles).length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Social Media</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(creator.socialProfiles).map(([platform, handle]) => (
              <a
                key={platform}
                href={`https://${platform}.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition"
              >
                <p className="text-sm text-gray-500 capitalize">{platform}</p>
                <p className="font-semibold">{handle}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
