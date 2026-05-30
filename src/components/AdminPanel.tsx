/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudioDetails, NailService, GalleryItem, Inquiry, Review } from '../types';
import {
  Settings, Users, ClipboardList, Scissors, Image as ImageIcon,
  MessageSquare, Save, Plus, Edit2, Trash, Check, X, Search, Eye
} from 'lucide-react';

interface AdminPanelProps {
  studioDetails: StudioDetails;
  services: NailService[];
  galleryItems: GalleryItem[];
  inquiries: Inquiry[];
  reviews: Review[];
  onUpdateStudio: (details: StudioDetails) => void;
  onUpdateServices: (services: NailService[]) => void;
  onUpdateGallery: (items: GalleryItem[]) => void;
  onUpdateInquiries: (inquiries: Inquiry[]) => void;
  onUpdateReviews: (reviews: Review[]) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({
  studioDetails,
  services,
  galleryItems,
  inquiries,
  reviews,
  onUpdateStudio,
  onUpdateServices,
  onUpdateGallery,
  onUpdateInquiries,
  onUpdateReviews,
  isOpen,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'inquiries' | 'services' | 'gallery' | 'reviews'>('inquiries');
  const [searchTerm, setSearchTerm] = useState('');

  // Local editing states for Studio details
  const [localStudio, setLocalStudio] = useState<StudioDetails>({ ...studioDetails });

  // Add/Edit Service states
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<NailService, 'id'>>({
    title: '',
    category: 'Hands',
    description: '',
    price: 500,
    priceType: 'starting'
  });

  // Add/Edit Gallery states
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryForm, setGalleryForm] = useState<Omit<GalleryItem, 'id'>>({
    title: '',
    description: '',
    imageUrl: '',
    category: 'Art'
  });

  // Modal open states
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  // Filtered queries for tracking bookings
  const filteredInquiries = inquiries.filter(
    inq =>
      inq.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.customerPhone.includes(searchTerm) ||
      inq.selectedServices.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Manage Studio profiles
  const handleSaveStudio = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudio(localStudio);
    alert('Studio details updated successfully! Changes are saved.');
  };

  // Manage Services (CRUD)
  const handleOpenAddService = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      category: 'Hands',
      description: '',
      price: 500,
      priceType: 'starting'
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service: NailService) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      category: service.category,
      description: service.description,
      price: service.price,
      priceType: service.priceType
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingServiceId) {
      // Edit
      const updated = services.map(s =>
        s.id === editingServiceId ? { ...s, ...serviceForm } : s
      );
      onUpdateServices(updated);
    } else {
      // Add
      const newService: NailService = {
        id: 'service-' + Date.now().toString(),
        ...serviceForm
      };
      onUpdateServices([...services, newService]);
    }
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service? Slot links will be cleaned.')) {
      onUpdateServices(services.filter(s => s.id !== id));
    }
  };

  // Manage Gallery (CRUD)
  const handleOpenAddGallery = () => {
    setEditingGalleryId(null);
    setGalleryForm({
      title: '',
      description: '',
      imageUrl: '/src/assets/images/nail_art_maroon_gold_1780037448125.png', // default preset
      category: 'Art'
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setGalleryForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGalleryId) {
      const updated = galleryItems.map(g =>
        g.id === editingGalleryId ? { ...g, ...galleryForm } : g
      );
      onUpdateGallery(updated);
    } else {
      const newItem: GalleryItem = {
        id: 'gallery-' + Date.now().toString(),
        ...galleryForm
      };
      onUpdateGallery([...galleryItems, newItem]);
    }
    setIsGalleryModalOpen(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm('Are you sure you want to remove this work from the gallery?')) {
      onUpdateGallery(galleryItems.filter(g => g.id !== id));
    }
  };

  // Manage Inquiries Status
  const handleInquiryStatusChange = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map(inq =>
      inq.id === id ? { ...inq, status } : inq
    );
    onUpdateInquiries(updated);
  };

  const handleInquiryNoteChange = (id: string, notes: string) => {
    const updated = inquiries.map(inq =>
      inq.id === id ? { ...inq, notes } : inq
    );
    onUpdateInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry from the calendar?')) {
      onUpdateInquiries(inquiries.filter(i => i.id !== id));
    }
  };

  // Manage Reviews
  const handleAddReview = () => {
    const author = prompt('Enter reviewers name:') || '';
    if (!author) return;
    const ratingStr = prompt('Enter rating (1 to 5):') || '5';
    const rating = Math.min(5, Math.max(1, parseInt(ratingStr) || 5));
    const text = prompt('Enter review description:') || '';
    if (!text) return;

    const newReview: Review = {
      id: 'review-' + Date.now().toString(),
      author,
      rating,
      text,
      date: new Date().toISOString().split('T')[0]
    };
    onUpdateReviews([...reviews, newReview]);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this custom review?')) {
      onUpdateReviews(reviews.filter(r => r.id !== id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2a1b1d]/70 backdrop-blur-sm z-40 flex items-center justify-center p-2 sm:p-4 select-text">
      <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh] border border-neutral-100 relative animate-fade-in">
        
        {/* Header bar */}
        <div className="bg-[#2a1b1d] text-white p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="text-[#f5bcc6] animate-spin-slow" size={22} />
            <div>
              <h2 className="font-serif text-lg font-medium tracking-wide">Nails Workspace Studio</h2>
              <p className="text-[10px] text-neutral-400 font-sans tracking-widest uppercase">Admin Panel & CMS Management</p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-1 px-3 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-all text-xs tracking-wider uppercase border border-white/15 cursor-pointer"
          >
            Close Panel
          </button>
        </div>

        {/* Dashboard Content split: Navigation (Left) + Manager (Right) */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Side Tabs Navigation */}
          <div className="w-16 sm:w-56 bg-neutral-50 border-r border-neutral-100 py-6 flex flex-col justify-between">
            <nav className="space-y-1.5 px-2">
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full py-3 px-3 rounded-xl flex items-center gap-2.5 transition-all outline-none cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#2a1b1d] text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                }`}
              >
                <ClipboardList size={18} />
                <span className="hidden sm:inline font-sans text-xs font-semibold tracking-wider uppercase">Inquiries ({inquiries.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full py-3 px-3 rounded-xl flex items-center gap-2.5 transition-all outline-none cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#2a1b1d] text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                }`}
              >
                <Users size={18} />
                <span className="hidden sm:inline font-sans text-xs font-semibold tracking-wider uppercase">Studio Info</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full py-3 px-3 rounded-xl flex items-center gap-2.5 transition-all outline-none cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-[#2a1b1d] text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                }`}
              >
                <Scissors size={18} />
                <span className="hidden sm:inline font-sans text-xs font-semibold tracking-wider uppercase">Services Catalog</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full py-3 px-3 rounded-xl flex items-center gap-2.5 transition-all outline-none cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-[#2a1b1d] text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                }`}
              >
                <ImageIcon size={18} />
                <span className="hidden sm:inline font-sans text-xs font-semibold tracking-wider uppercase">Gallery Grid</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full py-3 px-3 rounded-xl flex items-center gap-2.5 transition-all outline-none cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'bg-[#2a1b1d] text-white'
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800'
                }`}
              >
                <MessageSquare size={18} />
                <span className="hidden sm:inline font-sans text-xs font-semibold tracking-wider uppercase">Testimonials</span>
              </button>
            </nav>

            {/* Footer Tag */}
            <div className="hidden sm:block text-center text-[9px] text-neutral-400 px-4">
              Authorized admin mode.<br />Changes persist locally.
            </div>
          </div>

          {/* Active Workspace Panel */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-7">
            
            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-boutique-dark">Booking Requests Pipeline</h3>
                    <p className="text-neutral-450 text-xs mt-0.5">Manage and track booking leads received through the landing page form.</p>
                  </div>
                  
                  {/* Search filter */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-neutral-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-4 py-2 border rounded-xl border-neutral-200 text-xs w-full sm:w-56 focus:outline-none focus:border-boutique-rose"
                    />
                  </div>
                </div>

                {filteredInquiries.length === 0 ? (
                  <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                    <p className="text-neutral-450 text-xs">No active inquiries matched your search parameter.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 border rounded-2xl border-neutral-100 bg-white hover:shadow-md transition-shadow relative text-xs tracking-wide"
                      >
                        {/* Status Marker badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 border-b border-neutral-50 pb-2.5">
                          <div>
                            <span className="font-semibold text-neutral-800 text-sm">{inq.customerName}</span>
                            <span className="text-neutral-450 mx-1.5">|</span>
                            <span className="text-neutral-500 font-medium">{inq.customerPhone}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Status dropdown/pill controller */}
                            <select
                              value={inq.status}
                              onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as Inquiry['status'])}
                              className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full border outline-none text-left cursor-pointer ${
                                inq.status === 'Pending' && 'bg-amber-50 text-amber-600 border-amber-205'
                              } ${
                                inq.status === 'Confirmed' && 'bg-green-50 text-green-600 border-green-205'
                              } ${
                                inq.status === 'Completed' && 'bg-blue-50 text-blue-600 border-blue-205'
                              } ${
                                inq.status === 'Cancelled' && 'bg-red-50 text-red-600 border-red-205'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="p-1 px-2.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-neutral-50 transition-colors"
                              title="Delete enquiry"
                            >
                              <Trash size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Booking Details layout */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 text-neutral-600 leading-relaxed text-[11px]">
                          <div>
                            <strong className="text-neutral-500 uppercase text-[9px] tracking-wider block mb-0.5">Booking Cart</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {inq.selectedServices.length === 0 ? (
                                <span className="text-neutral-400 font-light italic">Consultation Inquiry</span>
                              ) : (
                                inq.selectedServices.map((srv, idx) => (
                                  <span key={idx} className="px-1.5 py-0.5 bg-neutral-100 text-neutral-700 rounded text-[9px] font-medium border border-neutral-200/50">
                                    {srv}
                                  </span>
                                ))
                              )}
                            </div>
                          </div>

                          <div>
                            <strong className="text-neutral-500 uppercase text-[9px] tracking-wider block mb-0.5">Date & Slot</strong>
                            <span className="font-medium text-neutral-800 block mt-1">
                              {inq.preferredDate || 'Flexible'} ({inq.preferredTime || 'Flexible'})
                            </span>
                          </div>

                          <div>
                            <strong className="text-neutral-500 uppercase text-[9px] tracking-wider block mb-0.5">Logged Date</strong>
                            <span className="text-neutral-400 block mt-1">
                              {new Date(inq.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Message content */}
                        <div className="p-3 bg-[#faf5f5] rounded-xl text-neutral-700 font-light italic leading-relaxed text-[11px] mb-3">
                          "{inq.message || 'No additional specifications written.'}"
                        </div>

                        {/* Custom Owner comment/notes */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide">Owner Note:</span>
                          <input
                            type="text"
                            placeholder="Add tracking note (e.g. Needs almond shape)..."
                            value={inq.notes || ''}
                            onChange={(e) => handleInquiryNoteChange(inq.id, e.target.value)}
                            className="flex-1 px-3 py-1 border-b border-transparent hover:border-neutral-200 focus:border-boutique-rose outline-none text-[11px] bg-transparent text-neutral-800"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STUDIO PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveStudio} className="space-y-5">
                <div className="border-b border-neutral-100 pb-4">
                  <h3 className="font-serif text-xl font-medium text-boutique-dark">Studio Branding Profile</h3>
                  <p className="text-neutral-450 text-xs mt-0.5">Maintain basic phone links, instagram channels, taglines, and hours.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Studio Name</label>
                    <input
                      type="text"
                      value={localStudio.name}
                      onChange={(e) => setLocalStudio({ ...localStudio, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Core Tagline</label>
                    <input
                      type="text"
                      value={localStudio.tagline}
                      onChange={(e) => setLocalStudio({ ...localStudio, tagline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">About Intro description</label>
                  <textarea
                    rows={4}
                    value={localStudio.about}
                    onChange={(e) => setLocalStudio({ ...localStudio, about: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white leading-relaxed"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Studio Phone</label>
                    <input
                      type="text"
                      value={localStudio.phone}
                      onChange={(e) => setLocalStudio({ ...localStudio, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">WhatsApp API Country (e.g. 918469798878)</label>
                    <input
                      type="text"
                      value={localStudio.whatsappNumber}
                      onChange={(e) => setLocalStudio({ ...localStudio, whatsappNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Instagram Handle</label>
                    <input
                      type="text"
                      value={localStudio.instagramHandle}
                      onChange={(e) => setLocalStudio({ ...localStudio, instagramHandle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Instagram Profile URL</label>
                    <input
                      type="url"
                      value={localStudio.instagramUrl}
                      onChange={(e) => setLocalStudio({ ...localStudio, instagramUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Salon Physical Address / Landmark</label>
                    <input
                      type="text"
                      value={localStudio.address}
                      onChange={(e) => setLocalStudio({ ...localStudio, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-neutral-100 pt-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Weekdays Hours</label>
                    <input
                      type="text"
                      value={localStudio.hours.weekdays}
                      onChange={(e) => setLocalStudio({
                        ...localStudio,
                        hours: { ...localStudio.hours, weekdays: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Weekends Hours</label>
                    <input
                      type="text"
                      value={localStudio.hours.weekends}
                      onChange={(e) => setLocalStudio({
                        ...localStudio,
                        hours: { ...localStudio.hours, weekends: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Booking note / Alert info</label>
                    <input
                      type="text"
                      value={localStudio.hours.note}
                      onChange={(e) => setLocalStudio({
                        ...localStudio,
                        hours: { ...localStudio.hours, note: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-boutique-rose bg-white"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-boutique-dark text-white hover:bg-neutral-800 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save size={14} />
                  Save Changes Persistently
                </button>
              </form>
            )}

            {/* SERVICES WORKSPACE TAB */}
            {activeTab === 'services' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-boutique-dark">Services Catalog</h3>
                    <p className="text-neutral-450 text-xs mt-0.5">Control pricing, service descriptions, and available catalog items.</p>
                  </div>

                  <button
                    onClick={handleOpenAddService}
                    className="px-4 py-2.5 rounded-xl bg-boutique-dark text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    Add New Service
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-neutral-500 border border-neutral-100 rounded-2xl overflow-hidden shadow-sm">
                    <thead className="bg-[#2a1b1d] text-white text-[10px] tracking-widest uppercase font-semibold">
                      <tr>
                        <th className="px-5 py-4">Title</th>
                        <th className="px-5 py-4">Category</th>
                        <th className="px-5 py-4">Pricing Type</th>
                        <th className="px-5 py-4">Price</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 bg-white">
                      {services.map((srv) => (
                        <tr key={srv.id} className="hover:bg-neutral-50 transition-colors">
                          <td className="px-5 py-3.5 font-medium text-neutral-800">{srv.title}</td>
                          <td className="px-5 py-3.5"><span className="px-2 py-0.5 bg-neutral-100 rounded-full text-[9px] font-bold text-neutral-600">{srv.category}</span></td>
                          <td className="px-5 py-3.5 text-neutral-600 italic font-light">{srv.priceType}</td>
                          <td className="px-5 py-3.5 font-semibold text-neutral-800">₹{srv.price}</td>
                          <td className="px-5 py-3.5 text-right flex justify-end gap-1.5 pt-3.5">
                            <button
                              onClick={() => handleOpenEditService(srv)}
                              className="p-1 px-2.5 rounded-lg text-neutral-500 hover:text-boutique-gold hover:bg-neutral-100 flex items-center gap-1 cursor-pointer"
                            >
                              <Edit2 size={11} /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteService(srv.id)}
                              className="p-1 px-2.5 rounded-lg text-[#cc0000] hover:bg-red-50 flex items-center gap-1 cursor-pointer"
                            >
                              <Trash size={11} /> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CURATED GALLERY GRID CATALOG TAB */}
            {activeTab === 'gallery' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-boutique-dark">Signature Designs Workspace</h3>
                    <p className="text-neutral-450 text-xs mt-0.5">Edit captions, rename works, or upload new reference nail styles to display.</p>
                  </div>

                  <button
                    onClick={handleOpenAddGallery}
                    className="px-4 py-2.5 rounded-xl bg-boutique-dark text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Design Picture
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <div key={item.id} className="p-3 border rounded-2xl bg-white border-neutral-100 hover:shadow-md transition-shadow relative">
                      <div className="aspect-square rounded-xl overflow-hidden bg-neutral-100 relative mb-3">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-md rounded text-white text-[9px] font-semibold tracking-widest uppercase">
                          {item.category}
                        </div>
                      </div>

                      <h4 className="font-serif text-sm font-medium text-neutral-800 truncate">{item.title}</h4>
                      <p className="text-neutral-400 text-[10px] mt-0.5 line-clamp-2 leading-normal min-h-[30px]">{item.description}</p>
                      
                      <div className="flex gap-2 border-t border-neutral-50 pt-2.5 mt-2 justify-end text-xs">
                        <button
                          onClick={() => handleOpenEditGallery(item)}
                          className="p-1 px-3 text-neutral-500 hover:text-[#cca468] hover:bg-amber-50/50 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 size={11} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-1 px-3 text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <Trash size={11} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'reviews' && (
              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-boutique-dark">Testimonials Feedback</h3>
                    <p className="text-neutral-450 text-xs mt-0.5">Showcase positive booking experiences directly on your page.</p>
                  </div>

                  <button
                    onClick={handleAddReview}
                    className="px-4 py-2.5 rounded-xl bg-boutique-dark text-white hover:bg-neutral-800 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    Add Testimonial
                  </button>
                </div>

                <div className="space-y-3">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="p-4 border rounded-2xl border-neutral-100 bg-[#faf6f7]/40 text-xs tracking-wide">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-semibold text-neutral-800">{rev.author}</span>
                          <span className="text-neutral-450 mx-2">|</span>
                          <span className="text-amber-400">{'★'.repeat(rev.rating)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-neutral-400 text-[10px]">{rev.date}</span>
                          <button
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1 text-neutral-400 hover:text-red-500 transition-colors"
                            title="Delete Review"
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                      </div>

                      <p className="text-neutral-600 line-clamp-3 leading-relaxed font-light">"{rev.text}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ADDITIONAL INNER DIALOG MODALS FOR CRUD OPERATIONS */}
      
      {/* 1. Add/Edit Service Modal Dialog */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border text-xs tracking-wide space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-neutral-100">
              <h4 className="font-serif text-lg font-medium text-boutique-dark">
                {editingServiceId ? 'Edit Service Details' : 'Add New Service to Catalog'}
              </h4>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="text-neutral-404 hover:text-neutral-800 bg-neutral-100 rounded-full p-1"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Service Title</label>
              <input
                type="text"
                value={serviceForm.title}
                onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6]"
                placeholder="e.g. Acrylic Overlay"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Category</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6] cursor-pointer"
                >
                  <option value="Hands">Hands</option>
                  <option value="Feet">Feet</option>
                  <option value="Art">Nail Art</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Price Type</label>
                <select
                  value={serviceForm.priceType}
                  onChange={(e) => setServiceForm({ ...serviceForm, priceType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6] cursor-pointer"
                >
                  <option value="starting">starting</option>
                  <option value="fixed">fixed</option>
                  <option value="per finger">per finger</option>
                  <option value="Contact for Price">Inquire price</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Price (INR ₹)</label>
              <input
                type="number"
                value={serviceForm.price}
                onChange={(e) => setServiceForm({ ...serviceForm, price: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6]"
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Short Description</label>
              <textarea
                rows={3}
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6]"
                placeholder="Give details about preparation, durable overlays, etc..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] font-bold tracking-wider uppercase transition-colors uppercase"
            >
              Save Service Details
            </button>
          </form>
        </div>
      )}

      {/* 2. Add/Edit Gallery Item Modal Dialog */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 animate-fade-in">
          <form onSubmit={handleSaveGalleryItem} className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border text-xs tracking-wide space-y-4">
            <div className="flex justify-between items-center border-b pb-3 border-neutral-100">
              <h4 className="font-serif text-lg font-medium text-boutique-dark">
                {editingGalleryId ? 'Edit Gallery Captions' : 'New Design Portfolio'}
              </h4>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="text-neutral-404 hover:text-neutral-800 bg-neutral-100 rounded-full p-1 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Art Design Title</label>
              <input
                type="text"
                value={galleryForm.title}
                onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6]"
                placeholder="e.g. Pearl French Tips"
                required
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Design Category</label>
              <select
                value={galleryForm.category}
                onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6] cursor-pointer"
              >
                <option value="Popular">Popular</option>
                <option value="Art">Nail Art</option>
                <option value="French">French Tips</option>
                <option value="CatEye">Cat Eye</option>
                <option value="Glitter">Glitters</option>
              </select>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block font-medium">Image Artwork Source (URL or Preset)</label>
              <select
                value={galleryForm.imageUrl}
                onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-[#f5bcc6] cursor-pointer mb-2"
              >
                <option value="/src/assets/images/nail_art_maroon_gold_1780037448125.png">Preset: Maroon & Gold branches</option>
                <option value="/src/assets/images/nail_art_french_gold_1780037467694.png">Preset: Glitter Gold tips</option>
                <option value="/src/assets/images/nail_art_wavy_gold_1780037490454.png">Preset: Abstract Milky Waves</option>
                <option value="/src/assets/images/nail_art_cateye_gold_1780037509022.png">Preset: Pink CatEye with Gold tips</option>
                <option value="https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80">Preset Unsplash: Nude Minimalist Nails</option>
                <option value="https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80">Preset Unsplash: Elegant Red Nails</option>
              </select>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-400">Or input custom web picture link:</span>
                <input
                  type="text"
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-3 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-[#f5bcc6]"
                />
              </div>
            </div>

            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-widest block">Design Description</label>
              <textarea
                rows={3}
                value={galleryForm.description}
                onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-[#e5e5e5] text-xs focus:outline-none focus:border-[#f5bcc6]"
                placeholder="Details of shimmer base, diamonds, shape..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 text-[11px] font-bold tracking-wider uppercase transition-colors"
            >
              Publish to Showcase Grid
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
