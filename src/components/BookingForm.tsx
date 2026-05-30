/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NailService, StudioDetails, Inquiry } from '../types';
import { Calendar, Clock, Clipboard, Send, Check } from 'lucide-react';

interface BookingFormProps {
  studioDetails: StudioDetails;
  services: NailService[];
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
  onSubmitInquiry: (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export default function BookingForm({
  studioDetails,
  services,
  selectedServiceIds,
  onToggleService,
  onSubmitInquiry
}: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppLink, setWhatsAppLink] = useState('');

  const selectedServicesList = services.filter(s => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServicesList.reduce((sum, s) => sum + s.price, 0);

  // Auto-generate target WhatsApp text link
  useEffect(() => {
    if (!name) return;
    
    const servicesText = selectedServicesList.map(s => `• ${s.title} (₹${s.price})`).join('\n');
    const textMessage = `Hello Nails by Prapti!\n\nI would like to book a nail appointment with the following details:\n\n*Client Name:* ${name}\n*Phone:* ${phone}\n*Preferred Timing:* ${preferredTime || 'Flexible'}\n\n*Selected Services:*\n${servicesText || '• General Consultation'}\n\n*Special Notes/Theme:*\n${message || 'None'}\n\nLooking forward to my beautiful nails! ✨`;
    
    const encodedMessage = encodeURIComponent(textMessage);
    const targetUrl = `https://wa.me/${studioDetails.whatsappNumber}?text=${encodedMessage}`;
    setWhatsAppLink(targetUrl);
  }, [name, phone, preferredTime, message, selectedServiceIds, studioDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Trigger parent submission to log in local storage table
    onSubmitInquiry({
      customerName: name,
      customerPhone: phone,
      selectedServices: selectedServicesList.map(s => s.title),
      preferredDate,
      preferredTime,
      message
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setPreferredDate('');
    setPreferredTime('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-20 bg-transparent relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 font-sans">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="font-serif italic text-2xl text-boutique-rose block mb-2">Book Your Session</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1e1e] font-semibold tracking-tight uppercase">
            Inquire & Schedule
          </h2>
          <div className="w-16 h-[2px] bg-boutique-rose mx-auto mt-3"></div>
          <p className="text-[#6d5a5a] mt-4 max-w-xl mx-auto font-sans text-sm font-light">
            Fill out your details below. Once submitted, click the prominent green button to open WhatsApp and instantly secure your booking slot!
          </p>
        </div>

        {submitted ? (
          /* Thank You Display with Direct WhatsApp Trigger */
          <div className="max-w-xl mx-auto rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/50 p-8 sm:p-10 text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
              <Check size={32} strokeWidth={2.5} />
            </div>
            
            <h3 className="font-serif italic text-2xl text-[#2d1e1e] font-medium mb-3">Inquiry Recorded!</h3>
            <p className="text-[#6d5a5a] text-sm leading-relaxed mb-8 font-light">
              Hi <strong className="text-neutral-900">{name}</strong>, your request has been logged successfully. To finalize your slot with Prapti immediately, click the direct WhatsApp link below:
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-full bg-[#25D366] text-white hover:bg-[#20ba56] hover:scale-[1.01] transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
              >
                <Send size={16} />
                Open WhatsApp & Confirm Slot Now
              </a>

              <button
                onClick={handleReset}
                className="py-3 px-6 rounded-full bg-white/40 hover:bg-white/70 transition-colors text-neutral-600 font-bold text-xs tracking-wider uppercase mt-2 cursor-pointer border border-white/50"
              >
                Submit Design Inquiry
              </button>
            </div>
          </div>
        ) : (
          /* Actual Interactive Booking Inquiry Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Details & Guidelines */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[32px] bg-[#2d1e1e]/90 backdrop-blur-xl text-white p-8 shadow-xl relative overflow-hidden border border-white/10">
                {/* Subtle Design Sparkles in background */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-boutique-rose/10 rounded-full filter blur-2xl"></div>

                <h3 className="font-serif italic text-2xl mb-4 text-[#fff0f3] flex items-center gap-2">
                  <span>How We Work</span>
                </h3>
                <p className="text-white/75 text-xs leading-relaxed mb-6 font-light">
                  Nails by Prapti values quality and detailed luxury. Every set is tailored precisely for your hand, requiring specialized preparation time.
                </p>

                <div className="space-y-5">
                  <div className="flex gap-3.5 items-start">
                    <span className="p-2 rounded-xl bg-white/10 text-boutique-rose text-sm">📅</span>
                    <div>
                      <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-100">Appointments Required</h4>
                      <p className="text-white/60 text-xs mt-0.5 font-light">{studioDetails.hours.note}</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="p-2 rounded-xl bg-white/10 text-boutique-rose text-sm">💬</span>
                    <div>
                      <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-100">Pre-booking Process</h4>
                      <p className="text-white/60 text-xs mt-0.5 font-light">Submit details, then double-check instantly on WhatsApp.</p>
                    </div>
                  </div>

                  <div className="flex gap-3.5 items-start">
                    <span className="p-2 rounded-xl bg-white/10 text-boutique-rose text-sm">📍</span>
                    <div>
                      <h4 className="font-sans font-bold text-xs tracking-wider uppercase text-neutral-100">Studio Address</h4>
                      <p className="text-white/60 text-xs mt-0.5 leading-relaxed font-light">{studioDetails.address}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest block font-bold">Follow Prapti</span>
                    <a
                      href={studioDetails.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-boutique-rose font-medium text-xs hover:underline mt-1 block"
                    >
                      {studioDetails.instagramHandle}
                    </a>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] text-white/50 uppercase tracking-widest block font-bold">Direct Phone</span>
                    <span className="text-white/80 text-xs mt-1 block">{studioDetails.phone}</span>
                  </div>
                </div>
              </div>

              {/* Selected Services Receipt block */}
              <div className="rounded-[32px] bg-white/40 backdrop-blur-xl border border-white/50 p-6 shadow-lg">
                <h4 className="font-serif italic text-xl text-[#2d1e1e] font-medium mb-3 flex items-center gap-2">
                  Selected Services ({selectedServicesList.length})
                </h4>
                {selectedServicesList.length === 0 ? (
                  <p className="text-[#7a6a6a] text-xs italic leading-relaxed font-light">
                    No services selected yet. Select services from the Menu above, or write down your requirements in the form message.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                    {selectedServicesList.map(s => (
                      <div key={s.id} className="flex justify-between items-center text-xs p-2.5 bg-white/40 border border-white/30 rounded-xl hover:bg-white/65 transition-colors">
                        <span className="text-neutral-700 truncate max-w-[180px] font-medium">{s.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#2d1e1e]">₹{s.price}</span>
                          <button
                            onClick={() => onToggleService(s.id)}
                            className="text-neutral-450 hover:text-[#d81b60] font-bold p-0.5 cursor-pointer text-base"
                            title="Remove Service"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-white/50 flex justify-between items-baseline font-sans mt-2">
                      <span className="font-bold text-[10px] uppercase tracking-wider text-[#7a6a6a]">Estimated Total:</span>
                      <span className="font-serif italic text-2xl font-bold text-[#2d1e1e]">₹{totalPrice}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Inquiring Input Fields */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white/35 backdrop-blur-xl rounded-[32px] p-8 sm:p-10 border border-white/45 shadow-xl space-y-6">
              <h3 className="font-serif italic text-2xl text-[#2d1e1e] font-medium">Send Design Inquiry</h3>
              <div className="w-10 h-[2px] bg-boutique-rose"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="customer-name" className="text-[11px] font-bold tracking-wider text-[#7a6a6a] uppercase block">Your Full Name *</label>
                  <input
                    id="customer-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your Name"
                    className="w-full px-4.5 py-3 rounded-2xl border border-white/50 text-sm focus:outline-none focus:border-boutique-rose/60 focus:ring-2 focus:ring-boutique-rose/10 bg-white/45"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="customer-phone" className="text-[11px] font-bold tracking-wider text-[#7a6a6a] uppercase block">Phone / WhatsApp *</label>
                  <input
                    id="customer-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 8469798878"
                    className="w-full px-4.5 py-3 rounded-2xl border border-white/50 text-sm focus:outline-none focus:border-boutique-rose/60 focus:ring-2 focus:ring-boutique-rose/10 bg-white/45"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="pref-time" className="text-[11px] font-bold tracking-wider text-[#7a6a6a] uppercase block flex items-center gap-1">
                  <Clock size={11} /> Preferred Date & Time
                </label>
                <input
                  id="pref-time"
                  type="text"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  placeholder="e.g. June 15th (Afternoon), or This Sunday around 3:00 PM"
                  className="w-full px-4.5 py-3 rounded-2xl border border-white/50 text-sm focus:outline-none focus:border-boutique-rose/60 focus:ring-2 focus:ring-boutique-rose/10 bg-white/45 text-[#3d2b2b]"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="notes-field" className="text-[11px] font-bold tracking-wider text-[#7a6a6a] uppercase block flex items-center gap-1">
                  <Clipboard size={11} /> Nail Theme Notes
                </label>
                <textarea
                  id="notes-field"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell Prapti what nail ideas, lengths, or special motifs you have in mind! (e.g. Coffin extensions, Pink Glitters, Metallic lines...)"
                  className="w-full px-4.5 py-3 rounded-2xl border border-white/50 text-sm focus:outline-none focus:border-boutique-rose/60 focus:ring-2 focus:ring-boutique-rose/10 bg-white/45"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2d1e1e] hover:bg-[#2d1e1e]/90 text-white rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-[1.01] cursor-pointer mt-4"
              >
                Create Invoice & Booking Request
              </button>
            </form>

          </div>
        )}
      </div>
    </section>
  );
}
