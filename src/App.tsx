/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  StudioDetails, NailService, GalleryItem, Inquiry, Review
} from './types';
import {
  INITIAL_STUDIO_DETAILS,
  INITIAL_SERVICES,
  INITIAL_GALLERY,
  INITIAL_INQUIRIES,
  INITIAL_REVIEWS
} from './dataPreset';
import NailsServices from './components/NailsServices';
import NailsGallery from './components/NailsGallery';
import BookingForm from './components/BookingForm';
import AdminPanel from './components/AdminPanel';
import {
  Sparkles, ShieldCheck, Settings, BookOpen, AlertCircle,
  Menu, X, Heart, Star, MapPin, Phone, Instagram, Clock, Check, Edit3
} from 'lucide-react';

export default function App() {
  // --- Persisted Database States ---
  const [studioDetails, setStudioDetails] = useState<StudioDetails>(() => {
    const saved = localStorage.getItem('nails_studio_details');
    return saved ? JSON.parse(saved) : INITIAL_STUDIO_DETAILS;
  });

  const [services, setServices] = useState<NailService[]>(() => {
    const saved = localStorage.getItem('nails_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('nails_gallery_items');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('nails_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nails_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // --- UI Operational States ---
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState<boolean>(false);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeHeader, setActiveHeader] = useState<boolean>(false);

  // --- Edit states inside Home layout ---
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false);

  // --- Auto-saving Engine to Local Storage ---
  useEffect(() => {
    localStorage.setItem('nails_studio_details', JSON.stringify(studioDetails));
  }, [studioDetails]);

  useEffect(() => {
    localStorage.setItem('nails_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('nails_gallery_items', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('nails_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('nails_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Navbar scrolling threshold observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setActiveHeader(true);
      } else {
        setActiveHeader(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set default document metadata dynamically
  useEffect(() => {
    document.title = `${studioDetails.name} | Custom Nails Art Lounge`;
  }, [studioDetails.name]);

  // --- Handlers for Booking Inquiry Actions ---
  const handleToggleService = (id: string) => {
    setSelectedServiceIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCreateInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      id: 'inq-' + Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...inquiryData
    };
    setInquiries(prev => [newInquiry, ...prev]);
  };

  return (
    <div className="font-sans antialiased min-h-screen text-[#3d2b2b] bg-[#fdfaf8] selection:bg-boutique-rose/30 selection:text-neutral-900 relative">
      
      {/* Mesh Background Elements */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#fce4ec] blur-[120px] opacity-65 pointer-events-none z-0"></div>
      <div className="absolute bottom-[20%] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#f3e5f5] blur-[150px] opacity-55 pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#fff0f3] blur-[100px] opacity-45 pointer-events-none z-0"></div>

      {/* Upper Information Bar */}
      <div className="bg-[#2d1e1e] text-white/90 text-[11px] tracking-widest uppercase font-semibold py-2 text-center border-b border-white/5 relative z-30 flex items-center justify-center gap-2 sm:gap-4 px-4 shadow-sm">
        <span>📍 Ahmedabad, India</span>
        <span className="hidden sm:inline text-white/20">|</span>
        <span>📞 Booking: +91 8469798878</span>
        <span className="hidden sm:inline text-white/20">|</span>
        <span className="text-[#fff0f3] font-bold bg-[#d81b60] px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[10px]">
          <Sparkles size={11} className="text-white fill-white" /> Prior Booking Required
        </span>
      </div>

      {/* Main Luxury Header / Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          activeHeader
            ? 'bg-white/40 backdrop-blur-xl shadow-lg border-b border-white/44 py-3.5'
            : 'bg-transparent py-5'
        }`}
        style={{ top: '33px' }} // Spaced below the upper bar
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between relative z-10">
          
          {/* Studio Script Script Logo */}
          <a href="#home" className="flex items-baseline gap-1.5 group">
            <div className="w-9 h-9 rounded-full bg-[#d81b60] flex items-center justify-center text-white font-serif text-lg italic font-bold">P</div>
            <span className="font-serif italic text-2xl font-bold tracking-tight text-[#2d1e1e] hover:text-[#d81b60] transition-colors">
              {studioDetails.name}
            </span>
          </a>

          {/* Desktop Smooth Scroll anchors */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-neutral-600">
            <a href="#about" className="hover:text-boutique-rose transition-colors">About Us</a>
            <a href="#services" className="hover:text-boutique-rose transition-colors">Services</a>
            <a href="#gallery" className="hover:text-boutique-rose transition-colors">Portfolio</a>
            <a href="#reviews" className="hover:text-boutique-rose transition-colors">Client Reviews</a>
            <a href="#contact" className="hover:text-boutique-rose transition-colors">Inquire</a>
          </nav>

          {/* Action pills: Header right */}
          <div className="flex items-center gap-3">
            
            {/* Developer/Owner "Edit Mode" switch button */}
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-widest border transition-all flex items-center gap-1 cursor-pointer select-none ${
                isAdmin
                  ? 'bg-green-500 text-white border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
                  : 'bg-white/50 backdrop-blur-md text-neutral-600 border-white/60 hover:border-boutique-rose/50 hover:text-neutral-850'
              }`}
              title="Toggle Sandbox Edit/Developer Mode"
            >
              <ShieldCheck size={11} />
              <span>{isAdmin ? 'Edit Mode ON' : 'Edit Mode'}</span>
            </button>

            {/* Float Book solid element */}
            <a
              href="#contact"
              className="hidden sm:inline-block px-5 py-2 text-[10px] bg-[#d81b60] text-white rounded-full font-bold uppercase tracking-wider hover:bg-[#c21855] hover:scale-[1.02] transition-all shadow-sm cursor-pointer"
            >
              Book Now
            </a>

            {/* Mobile Menu burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile slide drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-t border-neutral-150 py-4 px-6 space-y-3.5 flex flex-col font-sans uppercase font-bold tracking-widest text-xs text-neutral-600 block relative"
            >
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-boutique-gold"
              >
                About Us
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-boutique-gold"
              >
                Menu Pricing
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-boutique-gold"
              >
                Portfolio Gallery
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-boutique-gold"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-boutique-gold text-boutique-dark"
              >
                Booking Form
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Welcome banner section */}
      <section
        id="home"
        className="min-h-screen relative flex items-center justify-center pt-28 px-4"
        style={{
          background: `linear-gradient(rgba(42, 27, 29, 0.70), rgba(42, 27, 29, 0.85)), url('/src/assets/images/nails_studio_hero_1780037529673.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Animated abstract light glow overlay */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-boutique-rose/25 rounded-full filter blur-3xl animate-pulse animate-delay-75"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-boutique-rose/15 rounded-full filter blur-3xl animate-pulse animate-delay-150"></div>

        <div className="max-w-4xl mx-auto z-10 py-16 px-4">
          <div className="bg-white/20 backdrop-blur-xl border border-white/45 rounded-[40px] p-8 sm:p-14 md:p-16 flex flex-col justify-center items-center shadow-2xl relative overflow-hidden text-center">
            
            {/* Background design watermarked lettering */}
            <div className="absolute top-4 right-6 p-4 select-none pointer-events-none opacity-5">
              <span className="text-[140px] font-serif italic text-[#d81b60] leading-none select-none">Nails</span>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif italic text-xl sm:text-2xl text-boutique-rose block mb-2 font-medium tracking-wide"
            >
              Artistry at your Fingertips
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-serif text-4xl sm:text-7xl font-bold uppercase tracking-widest text-[#2d1e1e] flex flex-col gap-1"
            >
              {isAdmin ? (
                <input
                  value={studioDetails.name}
                  onChange={(e) => setStudioDetails({ ...studioDetails, name: e.target.value })}
                  className="bg-white/40 text-center border-b border-dashed border-[#d81b60] focus:border-[#d81b60] focus:outline-none py-1 max-w-lg mx-auto rounded-xl text-3xl sm:text-6xl text-[#2d1e1e]"
                  title="Double click to edit Studio Name"
                  placeholder="Studio Name"
                />
              ) : (
                <span className="leading-tight mb-2">
                  Elegance at your <br/>
                  <span className="text-[#d81b60] font-serif italic lowercase tracking-tight normal-case font-medium">{studioDetails.name}</span>
                </span>
              )}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-16 h-[2px] bg-boutique-rose my-6"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              {isAdmin ? (
                <textarea
                  value={studioDetails.tagline}
                  onChange={(e) => setStudioDetails({ ...studioDetails, tagline: e.target.value })}
                  className="bg-white/45 w-full max-w-xl mx-auto px-4 py-2 text-center text-xs sm:text-sm rounded-xl border border-dashed border-[#d81b60] focus:border-white outline-none block text-[#3d2b2b]"
                  rows={2}
                  placeholder="Tagline text"
                />
              ) : (
                <p className="text-[#6d5a5a] font-sans text-xs sm:text-base tracking-wider max-w-xl mx-auto font-light leading-relaxed">
                  {studioDetails.tagline}
                </p>
              )}
            </motion.div>

            {/* Prompt action items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap justify-center gap-4 mt-10 z-10"
            >
              <a
                href="#contact"
                className="px-8 sm:px-10 py-4 text-xs font-bold tracking-widest uppercase bg-[#d81b60] text-white rounded-full hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-[#d81b60]/20 cursor-pointer"
              >
                Book Appointment
              </a>
              <a
                href="#services"
                className="px-8 sm:px-10 py-4 text-xs font-bold tracking-widest uppercase bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-[#2d1e1e] hover:bg-white/80 active:scale-[0.98] transition-all cursor-pointer"
              >
                View Services
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom fading block */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#faf6f7] to-transparent"></div>
      </section>

      {/* ACTIVE DEVELOPER BANNER ALERTS */}
      {isAdmin && (
        <div className="sticky top-[100px] sm:top-14 z-30 bg-[#25D366]/90 border-y border-green-400 text-white text-xs py-2 px-4 shadow-[0_5px_15px_rgba(0,0,0,0.1)] flex items-center justify-between font-sans">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <strong>Sandboxed Edit Mode Active:</strong>
            <span className="opacity-90">Click and edit tags, taglines, text boxes and about copy inline instantly! Open workspace below for database CRUD.</span>
          </div>
          <button
            onClick={() => setIsAdminPanelOpen(true)}
            className="bg-white text-green-700 px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
          >
            <Settings size={11} className="spin" /> Open Database CRM
          </button>
        </div>
      )}

      {/* ABOUT THE ARTIST SECTION */}
      <section id="about" className="py-20 bg-transparent relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Artwork Showcase framed nicely */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -top-4 -left-4 w-full h-full border border-boutique-rose rounded-3xl -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              
              <div className="rounded-3xl overflow-hidden aspect-square relative shadow-xl border border-white/40">
                <img
                  src="/src/assets/images/nail_art_french_gold_1780037467694.png"
                  alt="Fine Manicure by Prapti"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Micro branding label inside image frame */}
                <div className="absolute bottom-5 left-5 bg-white/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30">
                  <span className="text-[10px] uppercase tracking-widest text-[#2d1e1e] font-semibold flex items-center gap-1.5 select-none">
                    <Heart size={10} className="text-[#d81b60] fill-[#d81b60]" /> Curated Studio
                  </span>
                </div>
              </div>

              {/* Gold floating overlay sticker */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#d81b60] text-white rounded-full flex flex-col items-center justify-center text-center p-2 shadow-lg shadow-[#d81b60]/20 rotate-12 select-none">
                <span className="text-[9px] uppercase tracking-widest font-black">Durable</span>
                <span className="font-serif text-sm font-semibold italic">100% Care</span>
                <span className="text-[7px] uppercase tracking-wider text-[#fff0f3]">Guaranteed</span>
              </div>
            </div>

            {/* Right Column: Bio Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-serif italic text-2xl text-boutique-rose block mb-1">Meet your nail artist</span>
                
                {isAdmin ? (
                  <input
                    value={studioDetails.name}
                    onChange={(e) => setStudioDetails({ ...studioDetails, name: e.target.value })}
                    className="bg-white border text-2xl font-serif text-[#2d1e1e] font-medium uppercase text-left w-full max-w-md p-1 px-2.5 rounded-xl border-dashed border-[#d81b60]"
                  />
                ) : (
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1e1e] font-bold uppercase tracking-wide">
                    About Prapti & Her Studio
                  </h2>
                )}
                
                <div className="w-12 h-[2px] bg-boutique-rose mt-2.5"></div>
              </div>

              <div className="text-[#6d5a5a] space-y-4 font-sans text-sm tracking-wide leading-relaxed font-light">
                {isAdmin ? (
                  <div className="space-y-2">
                    <label className="text-[9px] text-[#d81b60] font-bold uppercase">Artist Bio Copy:</label>
                    <textarea
                      value={studioDetails.about}
                      onChange={(e) => setStudioDetails({ ...studioDetails, about: e.target.value })}
                      rows={5}
                      className="w-full bg-white border border-dashed border-[#d81b60] p-3 rounded-xl focus:outline-none text-xs leading-relaxed"
                    />
                  </div>
                ) : (
                  <p>{studioDetails.about}</p>
                )}
              </div>

              {/* Small list of values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/50 text-xs">
                <div className="flex gap-2.5 items-start">
                  <span className="text-boutique-rose text-sm">✦</span>
                  <div>
                    <h5 className="font-semibold text-neutral-805 uppercase tracking-widest text-[10px] font-bold">Exceptional Hygiene</h5>
                    <p className="text-[#6d5a5a] mt-0.5 leading-normal font-light">Hospital-grade sanitized implements for every single process.</p>
                  </div>
                </div>

                <div className="flex gap-2.5 items-start">
                  <span className="text-boutique-rose text-sm">✦</span>
                  <div>
                    <h5 className="font-semibold text-neutral-800 uppercase tracking-widest text-[10px]">Premium Products Only</h5>
                    <p className="text-neutral-450 mt-0.5 leading-normal">Selected non-toxic overlays and chips-resistant materials.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES DISPLAY BLOCK SECTION */}
      <NailsServices
        services={services}
        selectedServiceIds={selectedServiceIds}
        onToggleService={handleToggleService}
        isAdmin={isAdmin}
        onEdit={(srv) => {
          setIsAdminPanelOpen(true);
          setActiveHeader(true);
        }}
        onDelete={(id) => setServices(prev => prev.filter(s => s.id !== id))}
        onAddNew={() => {
          setIsAdminPanelOpen(true);
        }}
      />

      {/* PORTFOLIO GRID SHOWCASE SECTION */}
      <NailsGallery
        items={galleryItems}
        isAdmin={isAdmin}
        onEdit={(item) => {
          setIsAdminPanelOpen(true);
        }}
        onDelete={(id) => setGalleryItems(prev => prev.filter(g => g.id !== id))}
        onAddNew={() => {
          setIsAdminPanelOpen(true);
        }}
      />

      {/* CLIENT REVIEWS FEEDBACK SECTION */}
      <section id="reviews" className="py-20 bg-transparent text-center relative z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="mb-14">
            <span className="font-serif italic text-2xl text-boutique-rose block mb-2 font-medium">Hearts of Love</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1e1e] font-semibold tracking-tight uppercase">
              Our Happy Hand Clients
            </h2>
            <div className="w-16 h-[2px] bg-boutique-rose mx-auto mt-3"></div>
          </div>

          {/* Grid or Carousel layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-lg flex flex-col justify-between hover:scale-[1.01] hover:bg-white/30 transition-all duration-300 relative text-left">
                {/* Decorative quote mark */}
                <span className="absolute right-6 top-5 text-4xl font-serif text-[#d81b60]/10 select-none font-bold">“</span>

                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 select-none">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star key={idx} size={13} className="fill-[#d81b60] text-[#d81b60]" />
                    ))}
                  </div>

                  <p className="text-[#6d5a5a] font-sans text-xs sm:text-[13px] leading-relaxed italic font-light mb-6">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/30 pt-4">
                  <span className="font-sans font-bold text-xs text-[#2d1e1e] uppercase tracking-wider">{rev.author}</span>
                  <span className="text-[10px] text-neutral-500 font-light italic">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={() => setIsAdminPanelOpen(true)}
              className="mt-10 px-5 py-2.5 rounded-full border border-dashed border-[#d81b60] text-[#d81b60] hover:text-white hover:bg-[#d81b60] text-xs font-semibold tracking-widest uppercase transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
            >
              Add/Manage Testimonials Feedback
            </button>
          )}

        </div>
      </section>

      {/* APPOINTMENTS FORM SECTION */}
      <BookingForm
        studioDetails={studioDetails}
        services={services}
        selectedServiceIds={selectedServiceIds}
        onToggleService={handleToggleService}
        onSubmitInquiry={handleCreateInquiry}
      />

      {/* MAP, LOCATION AREA & FAQS SECTION */}
      <section className="bg-white/30 backdrop-blur-md py-14 border-t border-white/40 text-center text-xs tracking-wider uppercase text-[#6d5a5a] font-sans relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          
          <div className="space-y-1.5">
            <span className="p-3 bg-[#d81b60]/10 text-[#d81b60] rounded-full inline-block text-sm">⏱️</span>
            <h4 className="font-bold text-[#2d1e1e] tracking-widest block pt-1.5">Opening Hours</h4>
            <p className="text-[#6d5a5a] normal-case tracking-normal lowercase text-[11px] font-light italic">
              Weekdays: {studioDetails.hours.weekdays}<br />
              Weekends: {studioDetails.hours.weekends}
            </p>
          </div>

          <div className="space-y-1.5 border-y sm:border-y-0 sm:border-x border-white/40 py-6 sm:py-0">
            <span className="p-3 bg-[#d81b60]/10 text-[#d81b60] rounded-full inline-block text-sm">💍</span>
            <h4 className="font-bold text-[#2d1e1e] tracking-widest block pt-1.5">Nail Protection</h4>
            <p className="text-[#6d5a5a] normal-case tracking-normal lowercase text-[11px] font-light italic">
              Prioritizing hydration barrier protectants.<br />
              All overlays optimized for absolute safety.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="p-3 bg-[#d81b60]/10 text-[#d81b60] rounded-full inline-block text-sm">💌</span>
            <h4 className="font-bold text-[#2d1e1e] tracking-widest block pt-1.5">Connect</h4>
            <p className="text-[#6d5a5a] normal-case tracking-normal text-[11px] font-medium font-sans">
              DM us on Instagram: <a href={studioDetails.instagramUrl} target="_blank" rel="noreferrer" className="text-[#d81b60] underline hover:opacity-80 block">{studioDetails.instagramHandle}</a>
            </p>
          </div>

        </div>
      </section>

      {/* PAGE FOOTER BAR */}
      <footer className="bg-[#2d1e1e] text-white/50 text-[11px] font-light tracking-wide py-12 text-center text-xs border-t border-white/5 font-sans relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <p className="font-serif italic text-white/95 text-2xl font-bold tracking-tight">Nails by Prapti</p>
          
          <div className="flex flex-wrap justify-center gap-6 text-[#fae1e6]/60 text-[10px] tracking-widest uppercase font-semibold">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#services" className="hover:text-white transition-colors">Menu</a>
            <a href="#gallery" className="hover:text-white transition-colors">Portfolio</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-white transition-colors">Book</a>
          </div>

          <div className="w-16 h-[1px] bg-white/10 mx-auto my-6"></div>

          <p className="normal-case leading-relaxed">
            &copy; {new Date().getFullYear()} Nails by Prapti. All rights reserved.<br />
            Designed with elite premium aesthetics in Gujarat, India.
          </p>
        </div>
      </footer>

      {/* MASTER ADMIN CRM FLOATING ACTIVATE BUTTON */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-center gap-2 animate-fade-in select-none">
        {isAdmin && (
          <span className="bg-green-500/90 text-white font-sans font-bold text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full shadow-md animate-pulse">
            Database Live
          </span>
        )}
        
        <button
          onClick={() => setIsAdminPanelOpen(!isAdminPanelOpen)}
          className={`p-4 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 relative cursor-pointer group select-none hover:scale-105 active:scale-95 ${
            isAdminPanelOpen || isAdmin
              ? 'bg-[#d81b60] text-white border border-[#e91e63] hover:bg-[#c21855]'
              : 'bg-[#2d1e1e] text-white hover:bg-neutral-850'
          }`}
          title="Open Master Salon Database (Service CRUD & Bookings)"
        >
          <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
          
          {/* Unread Bookings counter badge */}
          {inquiries.filter(i => i.status === 'Pending').length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white font-sans font-black text-[9px] rounded-full flex items-center justify-center border border-white">
              {inquiries.filter(i => i.status === 'Pending').length}
            </span>
          )}
        </button>
      </div>

      {/* ADMINISTRATIVE WORKSPACE CONTROL PANEL DRAWER BLOCK */}
      <AdminPanel
        studioDetails={studioDetails}
        services={services}
        galleryItems={galleryItems}
        inquiries={inquiries}
        reviews={reviews}
        onUpdateStudio={setStudioDetails}
        onUpdateServices={setServices}
        onUpdateGallery={setGalleryItems}
        onUpdateInquiries={setInquiries}
        onUpdateReviews={setReviews}
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

    </div>
  );
}
