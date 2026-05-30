/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Plus, Edit2, Trash2, Tag, ZoomIn, X } from 'lucide-react';

interface NailsGalleryProps {
  items: GalleryItem[];
  isAdmin: boolean;
  onEdit: (item: GalleryItem) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
}

export default function NailsGallery({
  items,
  isAdmin,
  onEdit,
  onDelete,
  onAddNew
}: NailsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory);

  return (
    <section id="gallery" className="py-20 bg-transparent relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-12">
          <span className="font-serif italic text-2xl text-boutique-rose block mb-2">Our Curated Creations</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2d1e1e] font-semibold tracking-tight uppercase">
            Signature Design Gallery
          </h2>
          <div className="w-16 h-[2px] bg-boutique-rose mx-auto mt-3"></div>
          <p className="text-[#6d5a5a] mt-4 max-w-xl mx-auto font-sans text-sm font-light">
            Handcrafted details designed and engineered by Prapti. Click on any design to enlarge and see the details.
          </p>
        </div>

        {/* Categories and Commands */}
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
              Add Design
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-neutral-400 font-sans font-light">
            No designs found in this category. Click 'Add Design' to add.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[28px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/10 border border-white/35 aspect-square flex flex-col justify-end"
              >
                {/* Nails Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300"></div>

                {/* Content Overlay */}
                <div className="relative p-5 text-white z-10 select-none">
                  <div className="flex items-center gap-1 text-[10px] text-[#fce4ec] font-bold tracking-widest uppercase mb-1.5">
                    <Tag size={10} className="text-boutique-rose" />
                    <span>{item.category}</span>
                  </div>
                  
                  <h3 className="font-serif italic text-xl leading-snug text-neutral-50 mb-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-light">
                    {item.description}
                  </p>

                  {/* Enlargement indicator */}
                  <button
                    onClick={() => setSelectedImage(item.imageUrl)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 hover:bg-white/40 hover:scale-105 transition-all text-white cursor-pointer"
                    title="Enlarge Image"
                  >
                    <ZoomIn size={14} />
                  </button>
                </div>

                {/* Admin Management Tag */}
                {isAdmin && (
                  <div className="absolute top-4 left-4 flex gap-1 z-20">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-lg bg-white text-neutral-800 hover:text-boutique-gold hover:bg-white transition-colors shadow-md"
                      title="Edit Captions"
                    >
                      <Edit2 size={12} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded-lg bg-white text-neutral-800 hover:text-red-500 hover:bg-white transition-colors shadow-md"
                      title="Remove from Gallery"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:text-boutique-rose transition-colors bg-white/10 p-2.5 rounded-full cursor-pointer hover:bg-white/20"
          >
            <X size={24} />
          </button>
          
          <img
            src={selectedImage}
            alt="Nails Studio Masterpiece"
            referrerPolicy="no-referrer"
            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl object-contain border border-white/5 animate-fade-in"
          />
        </div>
      )}
    </section>
  );
}
