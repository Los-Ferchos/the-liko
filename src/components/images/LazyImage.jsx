import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, placeholderSrc, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          imgRef.current.src = src;
          setImageLoaded(true);
          observer.unobserve(imgRef.current);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <div className={className} style={style}>
      <img
        ref={imgRef}
        src={placeholderSrc}
        alt={alt}
        style={{ objectFit: 'contain', width: '100%', height: '100%', display: imageLoaded ? 'block' : 'block', flex: '1 0 auto' }}
      />
    </div>
  );
};

export default LazyImage;
