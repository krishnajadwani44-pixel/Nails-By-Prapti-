/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StudioDetails {
  name: string;
  tagline: string;
  about: string;
  phone: string;
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  address: string;
  hours: {
    weekdays: string;
    weekends: string;
    note: string;
  };
}

export interface NailService {
  id: string;
  title: string;
  category: 'Hands' | 'Feet' | 'Custom' | 'Art' | string;
  description: string;
  price: number;
  priceType: 'starting' | 'fixed' | 'per finger' | 'free' | string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Popular' | 'Glitter' | 'French' | 'CatEye' | 'Art' | string;
}

export interface Inquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  selectedServices: string[]; // service titles
  preferredDate: string;
  preferredTime: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  notes?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  reply?: string;
}
