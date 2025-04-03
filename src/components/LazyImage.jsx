import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '100px' } // Tải ảnh sớm hơn khi còn cách 100px
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      loading="eager"
      src={isVisible ? src : ''}
      alt={alt}
      className={className}
      style={{ opacity: isVisible ? 1 : 0.5, transition: 'opacity 0.5s' }}
    />
  );
};

export default LazyImage;
