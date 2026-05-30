/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StudioDetails, NailService, GalleryItem, Review, Inquiry } from './types';

export const INITIAL_STUDIO_DETAILS: StudioDetails = {
  name: 'Nails by Prapti',
  tagline: 'Expert Nail Art, Gel Manicures & Smart Extensions designed to make your hands shine.',
  about: 'Welcome to Nails by Prapti, where nail art meets exceptional craftsmanship. Led by Prapti, we specialize in custom gel manicures, structured overlays, elegant nail extensions, and stunning, personalized nail art. Whether you are looking for classic, timeless French tips or avant-garde, hand-penciled metallic designs, we focus on nail health and unparalleled beauty. Our boutique studio provides a peaceful, luxurious pampering escape tailored entirely to you.',
  phone: '+91 8469798878',
  whatsappNumber: '918469798878',
  instagramHandle: '@nails.by_prapti',
  instagramUrl: 'https://instagram.com/nails.by_prapti',
  address: 'Premium Nails Lounge, Near Ring Road, Ahmedabad, India',
  hours: {
    weekdays: '11:00 AM - 08:00 PM',
    weekends: '10:00 AM - 09:00 PM',
    note: 'Prior Booking / Pre-appointment Required'
  }
};

export const INITIAL_SERVICES: NailService[] = [
  {
    id: 's1',
    title: 'Gel Polish on Natural Nail',
    category: 'Hands',
    description: 'Long-lasting gel overlay applied to your natural nails with professional preparation, cuticle grooming, and complete nail health care.',
    price: 500,
    priceType: 'starting'
  },
  {
    id: 's2',
    title: 'Nail Extension',
    category: 'Hands',
    description: 'Beautiful, durable, and lightweight modern nail extensions to add the perfect length, strength, and elegance to your hands.',
    price: 700,
    priceType: 'starting'
  },
  {
    id: 's3',
    title: 'Nail Art (Single Finger)',
    category: 'Art',
    description: 'Exquisite, hand-painted custom details on the finger of your choice. Choose from floral designs, marble textures, or metallic linework.',
    price: 50,
    priceType: 'per finger'
  },
  {
    id: 's4',
    title: 'Feet Gel Polish',
    category: 'Feet',
    description: 'Relaxing dry pedicure prep followed by smooth application of long-lasting, high-gloss gel polish on your toes.',
    price: 500,
    priceType: 'starting'
  },
  {
    id: 's5',
    title: 'Feet Extension',
    category: 'Feet',
    description: 'Toe-nail enhancements to repair, lengthen, or perfect your toes for beautiful, open-toed footwear styling.',
    price: 700,
    priceType: 'starting'
  },
  {
    id: 's6',
    title: 'Customized Press-On Nails',
    category: 'Custom',
    description: 'Tailored, reusable, luxury press-on nails matching your exact sizing, color preferences, and art specifications. Shipped directly.',
    price: 999,
    priceType: 'starting'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Imperial Maroon & Gold',
    description: 'Stunning gloss burgundy nails adorned with hand-styled luxurious gold branch and leaf accents.',
    imageUrl: '/src/assets/images/nail_art_maroon_gold_1780037448125.png',
    category: 'Art'
  },
  {
    id: 'g2',
    title: 'Golden Shimmer French',
    description: 'Nude-pink elegance crowned with vibrant gold glitter tips. Subtly modern and perfect for special celebrations.',
    imageUrl: '/src/assets/images/nail_art_french_gold_1780037467694.png',
    category: 'French'
  },
  {
    id: 'g3',
    title: 'Abstract Metallic Waves',
    description: 'An artistic, milky base featuring modern flowing metallic gold liquid swirls and abstract curves.',
    imageUrl: '/src/assets/images/nail_art_wavy_gold_1780037490454.png',
    category: 'Art'
  },
  {
    id: 'g4',
    title: 'Cat-Eye Shimmer Glitz',
    description: 'Dazzling velvet-effect pink cat-eye base accompanied by sleek, high-foil gold leaf tip linings.',
    imageUrl: '/src/assets/images/nail_art_cateye_gold_1780037509022.png',
    category: 'CatEye'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Neha Patel',
    rating: 5,
    text: 'Absolutely the best nail experience I have ever had! Prapti is incredibly precise with her designs. The gold branch detailing on my maroon extensions got me literally hundreds of compliments in my sister’s wedding!',
    date: '2026-05-12'
  },
  {
    id: 'r2',
    author: 'Riya Shah',
    rating: 5,
    text: 'Her press-on nails are super durable and reusable. They fit perfectly and look exactly like studio extensions. Such an amazing and cost-effective option!',
    date: '2026-05-24'
  },
  {
    id: 'r3',
    author: 'Ashi Sharma',
    rating: 5,
    text: 'I am highly particular about structural shape and cuticle protection. Prapti takes her time, works with professional dedication, and the finish is completely flawless and natural.',
    date: '2026-05-27'
  }
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    customerName: 'Kajal Mehta',
    customerPhone: '+91 9876543210',
    selectedServices: ['Gel Polish on Natural Nail', 'Nail Art (Single Finger)'],
    preferredDate: '2026-06-02',
    preferredTime: '11:30 AM',
    message: 'Hello! I want a nude pink base with gold foil brush strokes on my accent fingers.',
    status: 'Pending',
    createdAt: '2026-05-28T14:30:00Z',
    notes: 'Requested pink theme'
  },
  {
    id: 'inq-2',
    customerName: 'Priyanka Dave',
    customerPhone: '+91 9988776655',
    selectedServices: ['Nail Extension'],
    preferredDate: '2026-06-05',
    preferredTime: '04:00 PM',
    message: 'Hey Prapti! First-time customer here. I want medium length coffin extensions.',
    status: 'Confirmed',
    createdAt: '2026-05-29T05:15:00Z',
    notes: 'First time client, booked on recommendation of Neha.'
  }
];
