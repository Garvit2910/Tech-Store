import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

function CustomerReviews({ rating, reviewCount, productId }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock reviews data
  const mockReviews = [
    {
      id: 1,
      userName: 'Rajesh Kumar',
      userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5,
      date: '2024-01-15',
      title: 'Excellent Gaming Performance',
      comment: `Outstanding laptop for gaming and professional work. The RTX 3060 handles all modern games at high settings with smooth frame rates. The 144Hz display is incredibly responsive and the build quality feels premium. Highly recommended for gamers and content creators.`,
      verified: true,
      helpful: 24,
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200&h=150&fit=crop'
      ]
    },
    {
      id: 2,
      userName: 'Priya Sharma',
      userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4,
      date: '2024-01-10',
      title: 'Great Value for Money',
      comment: `Very satisfied with this purchase. The laptop performs well for my design work and occasional gaming. The only minor issue is that it gets a bit warm during intensive tasks, but the cooling system manages it well. Overall, excellent value for the price.`,
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      userName: 'Amit Patel',
      userAvatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 5,
      date: '2024-01-05',
      title: 'Perfect for Programming',
      comment: `As a software developer, this laptop meets all my requirements. Fast compilation times, excellent display quality, and the keyboard is comfortable for long coding sessions. The battery life is decent for a gaming laptop.`,
      verified: true,
      helpful: 15
    },
    {
      id: 4,
      userName: 'Sneha Reddy',
      userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4,
      date: '2023-12-28',
      title: 'Good Build Quality',
      comment: `Solid build quality and performance. The RGB keyboard looks great and the laptop feels sturdy. Delivery was quick and packaging was excellent. Would definitely recommend to others looking for a gaming laptop in this price range.`,
      verified: false,
      helpful: 12
    },
    {
      id: 5,
      userName: 'Vikram Singh',
      userAvatar: 'https://randomuser.me/api/portraits/men/72.jpg',
      rating: 3,
      date: '2023-12-20',
      title: 'Average Experience',
      comment: `The laptop is decent but not exceptional. Performance is good for most tasks but I expected better cooling. The display is nice but could be brighter. It's okay for the price but there might be better alternatives.`,
      verified: true,
      helpful: 8
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 78, percentage: 61 },
    { stars: 4, count: 32, percentage: 25 },
    { stars: 3, count: 12, percentage: 9 },
    { stars: 2, count: 4, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews', count: reviewCount },
    { value: '5', label: '5 Stars', count: 78 },
    { value: '4', label: '4 Stars', count: 32 },
    { value: '3', label: '3 Stars', count: 12 },
    { value: 'verified', label: 'Verified', count: 98 }
  ];

  const filteredReviews = mockReviews.filter(review => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'verified') return review.verified;
    return review.rating === parseInt(selectedFilter);
  });

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          className={`${i <= rating ? 'text-yellow-400 fill-current' : 'text-secondary-300'}`}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 mb-8">
      <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
        <Icon name="MessageSquare" size={24} className="mr-2" />
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Overall Rating */}
        <div className="text-center lg:text-left">
          <div className="text-4xl font-bold text-text-primary mb-2">{rating}</div>
          <div className="flex items-center justify-center lg:justify-start mb-2">
            {renderStars(Math.round(rating))}
          </div>
          <div className="text-text-secondary">
            Based on {reviewCount} reviews
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="lg:col-span-2">
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-text-secondary">{item.stars}</span>
                  <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-secondary-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
              selectedFilter === option.value
                ? 'bg-primary text-white' :'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            {option.label} ({option.count})
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review.userAvatar}
                alt={review.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-text-primary">{review.userName}</h4>
                    {review.verified && (
                      <span className="bg-accent text-white text-xs px-2 py-1 rounded-full flex items-center">
                        <Icon name="CheckCircle" size={12} className="mr-1" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-text-secondary">{formatDate(review.date)}</span>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium text-text-primary">{review.title}</span>
                </div>

                <p className="text-text-secondary mb-3 leading-relaxed">{review.comment}</p>

                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 rounded-lg object-cover border border-border"
                      />
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-text-secondary hover:text-text-primary transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="text-sm text-text-secondary hover:text-text-primary transition-smooth">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {filteredReviews.length > 3 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="px-6 py-2 border border-border rounded-lg text-text-primary hover:bg-secondary-50 transition-smooth"
          >
            {showAllReviews ? 'Show Less Reviews' : `Show All ${filteredReviews.length} Reviews`}
          </button>
        </div>
      )}

      {/* Write Review Button */}
      <div className="mt-6 p-4 bg-secondary-50 rounded-lg text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Share Your Experience</h3>
        <p className="text-text-secondary mb-4">Help others make informed decisions by writing a review.</p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-smooth">
          Write a Review
        </button>
      </div>
    </div>
  );
}

export default CustomerReviews;