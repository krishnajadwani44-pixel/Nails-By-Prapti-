/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NailService } from '../types';
import { Plus, Edit2, Trash2, Check, Sparkles } from 'lucide-react';

interface NailsServicesProps {
  services: NailService[];
  selectedServiceIds: string[];
  onToggleService: (id: string) => void;
  isAdmin: boolean;
  onEdit: (service: NailService) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export default function NailsServices({
  services,
  selectedServiceIds,
  onToggleService,
  isAdmin,
  onEdit,
  onDelete,
  onAddNew
}: NailsServicesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Find unique categories
  const categories = ['All', ...Array.from(new Set(services.map(s => s.category)))];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-transparent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-1/10 w-48 h-48 bg-[#fce4ec]/40 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/10 w-64 h-64 bg-[#f3e5f5]/30 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="font-serif italic text-2xl text-boutique-rose block mb-2">Our Signature Menu</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1e1e] font-semibold tracking-tight uppercase">
            Services & Pricing
          </h2>
          <div className="w-16 h-[2px] bg-boutique-rose mx-auto mt-3"></div>
          <p className="text-[#6d5a5a] mt-4 max-w-xl mx-auto font-sans text-sm font-light">
            Meticulous attention to detail using premium products. Select services below to automatically customize your booking inquiry.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#2d1e1e] text-white shadow-lg'
                  : 'bg-white/40 backdrop-blur-md text-[#7a6a6a] hover:bg-white/60 border border-white/50'
              }`}
            >
              {cat}
            </button>
          ))}

          {isAdmin && (
            <button
              onClick={onAddNew}
              className="px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-boutique-rose text-white hover:scale-[1.02] flex items-center gap-1.5 shadow-lg ml-2 transition-transform"
            >
              <Plus size={14} />
              Add Service
            </button>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className={`relative rounded-[32px] p-8 border transition-all duration-500 flex flex-col justify-between tracking-wide ${
                  isSelected
                    ? 'border-boutique-rose/60 bg-white/60 backdrop-blur-xl shadow-xl ring-1 ring-boutique-rose/40'
                    : 'bg-white/30 backdrop-blur-xl border-white/40 hover:border-boutique-rose/45 shadow-lg hover:bg-white/50 hover:scale-[1.01]'
                }`}
              >
                {/* Category Badge */}
                <div className="flex justify-between items-start mb-5">
                  <span className="px-3.5 py-1 bg-[#fce4ec] text-[#d81b60] rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {service.category}
                  </span>

                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => onEdit(service)}
                        className="p-1.5 rounded-lg bg-white/60 text-neutral-605 hover:text-boutique-rose hover:bg-white/90 transition-colors border border-white/40"
                        title="Edit Service"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => onDelete(service.id)}
                        className="p-1.5 rounded-lg bg-white/60 text-neutral-605 hover:text-red-500 hover:bg-white/90 transition-colors border border-white/40"
                        title="Delete Service"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Service Details */}
                <div className="mb-6 flex-grow">
                  <h3 className="font-serif italic text-2xl text-[#2d1e1e] font-medium leading-snug flex items-center gap-1.5">
                    {service.title}
                    {service.priceType === 'per finger' && (
                      <Sparkles size={14} className="text-boutique-rose" />
                    )}
                  </h3>
                  <p className="text-[#6d5a5a] text-xs mt-3 leading-relaxed min-h-[48px] font-light">
                    {service.description}
                  </p>
                </div>

                {/* Footer with Price and Selection Action */}
                <div className="flex items-center justify-between pt-5 border-t border-white/30 mt-auto">
                  <div>
                    <span className="text-[10px] text-[#7a6a6a] block uppercase tracking-wider font-semibold">Estimated Price</span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif italic text-3xl font-medium text-[#2d1e1e]">₹{service.price}</span>
                      {service.priceType && (
                        <span className="text-xs text-[#7a6a6a] font-light italic">
                          {service.priceType === 'starting' && 'starting'}
                          {service.priceType === 'per finger' && 'per finger'}
                          {service.priceType === 'fixed' && 'fixed'}
                          {service.priceType !== 'starting' && service.priceType !== 'per finger' && service.priceType !== 'fixed' && service.priceType}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleService(service.id)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#d81b60] text-white shadow-[#d81b60]/20 shadow-md hover:scale-[1.02]'
                        : 'bg-[#2d1e1e]/90 backdrop-blur-md text-white hover:bg-[#2d1e1e] shadow-sm'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={13} strokeWidth={2.5} />
                        Selected
                      </>
                    ) : (
                      'Select to Book'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
