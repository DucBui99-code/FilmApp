import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className, style }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
      { rootMargin: '100px' } // Tải ảnh sớm khi còn cách 100px
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
      src={isVisible ? src : ''}
      alt={alt}
      className={className}
      onLoad={() => setIsLoaded(true)}
      style={{
        filter: isLoaded ? 'none' : 'blur(10px)', // Áp dụng hiệu ứng blur khi ảnh chưa load
        opacity: isLoaded ? 1 : 0.5, // Điều chỉnh độ mờ nhẹ khi chưa load
        transition: 'filter 0.5s ease-out, opacity 0.5s ease-out',
        ...style,
      }}
    />
  );
};

export default LazyImage;
