import React, { useState, useEffect, useRef } from 'react';

/**
 * Displays an image that is lazily loaded when it becomes visible in the viewport.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.src - The URL of the image to load when it becomes visible.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.placeholderSrc - The URL of a placeholder image to display before the main image loads.
 * @param {string} [props.className] - Additional CSS class name(s) for the image container.
 * @param {Object} [props.style] - Additional inline CSS styles for the image container.
 * 
 * @returns {JSX.Element} Rendered LazyImage component.
 */
const LazyImage = ({ src, alt, placeholderSrc, className, style }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  /**
   * useEffect to observe the image element and load the main image when it becomes visible
   */
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
