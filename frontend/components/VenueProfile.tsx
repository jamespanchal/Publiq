'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Venue {
  id: string;
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
}

interface VenueProfileProps {
  venueId: string;
}

export default function VenueProfile({ venueId }: VenueProfileProps) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get(`/api/venues/${venueId}`);
        setVenue(response.data.data);
      } catch (error) {
        console.error('Failed to fetch venue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!venue) return <div className="text-center py-8">Venue not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 h-32 rounded-lg mb-4"></div>

      {/* Venue Info Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 -mt-16 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src={venue.logoUrl || 'https://via.placeholder.com/150'}
              alt={venue.name}
              width={150}
              height={150}
              className="rounded-lg border-4 border-white shadow-lg"
            />
          </div>

          {/* Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{venue.name}</h1>
              {venue.verificationStatus === 'verified' && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">✓ Verified</span>
              )}
            </div>
            <p className="text-lg capitalize text-gray-600 mb-2">{venue.category}</p>
            <p className="text-gray-700 mb-4">{venue.description}</p>
            <div className="space-y-2">
              <p className="text-gray-600">📍 {venue.address}</p>
              <p className="text-gray-600">📞 {venue.phone}</p>
              {venue.website && <p className="text-blue-600">🌐 {venue.website}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Rating</p>
          <p className="text-2xl font-bold">⭐ {venue.rating}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Campaigns</p>
          <p className="text-2xl font-bold">{venue.totalCampaigns}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Status</p>
          <p className="text-lg font-bold capitalize">{venue.verificationStatus}</p>
        </div>
      </div>
    </div>
  );
}
