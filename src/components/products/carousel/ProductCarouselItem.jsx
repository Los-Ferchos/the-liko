// ProductCarouselItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCarouselItem = ({ imageUrl }) => {
  return (
    <div >
      <Link to="#">
        <img src={imageUrl} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Link>
    </div>
  );
};

export default ProductCarouselItem;