import React from 'react';

const StarRating = ({ rating, onRate }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          style={{
            cursor: 'pointer',
            fontSize: '50px',
            color: star <= rating ? 'GOLD' : 'DARKGRAY',
            margin: '0 10px',
            display: 'inline-block'
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
