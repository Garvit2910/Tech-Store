import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function ProductImageGallery({ images = [], videos = [], productName }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const allMedia = [...images, ...videos.map(video => ({ type: 'video', url: video }))];

  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    setIsZoomed(false);
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allMedia.length - 1 : prev - 1));
    setIsZoomed(false);
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allMedia.length - 1 ? 0 : prev + 1));
    setIsZoomed(false);
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const currentMedia = allMedia[selectedIndex];
  const isVideo = typeof currentMedia === 'object' && currentMedia.type === 'video';

  return (
    <div className="space-y-4">
      {/* Main Image/Video Display */}
      <div className="relative aspect-square bg-secondary-50 rounded-lg overflow-hidden group">
        {isVideo ? (
          <iframe
            src={currentMedia.url}
            title={`${productName} Video`}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
          />
        ) : (
          <div
            className={`relative w-full h-full cursor-${isZoomed ? 'zoom-out' : 'zoom-in'}`}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            <Image
              src={currentMedia}
              alt={`${productName} - Image ${selectedIndex + 1}`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                  : {}
              }
            />
            
            {/* Zoom Icon */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} />
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {allMedia.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </>
        )}

        {/* Media Counter */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {selectedIndex + 1} / {allMedia.length}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      {allMedia.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {allMedia.map((media, index) => {
            const isVideoThumb = typeof media === 'object' && media.type === 'video';
            return (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-secondary-300'
                }`}
              >
                {isVideoThumb ? (
                  <div className="w-full h-full bg-secondary-100 flex items-center justify-center">
                    <Icon name="Play" size={16} className="text-secondary-600" />
                  </div>
                ) : (
                  <Image
                    src={media}
                    alt={`${productName} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {isVideoThumb && (
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <Icon name="Play" size={12} className="text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Mobile Swipe Indicators */}
      <div className="flex justify-center space-x-2 md:hidden">
        {allMedia.map((_, index) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              selectedIndex === index ? 'bg-primary' : 'bg-secondary-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductImageGallery;