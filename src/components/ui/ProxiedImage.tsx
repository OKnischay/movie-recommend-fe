'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProxiedImageProps {
  src: string | null | undefined;
  alt: string;
  title?: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}

const ProxiedImage: React.FC<ProxiedImageProps> = ({
  src,
  alt,
  title,
  className = '',
  width,
  height,
  fill = false,
  priority = false
}) => {
  const [imageError, setImageError] = useState(false);

  const getImageSrc = (): string => {
    if (!src || imageError) {
      // Return placeholder API
      const encodedTitle = encodeURIComponent(title || alt);
      return `/api/placeholder?width=${width || 300}&height=${height || 400}&text=${encodedTitle}`;
    }

    // If it's already a local URL, use it directly
    if (src.startsWith('/') || src.startsWith('data:')) {
      return src;
    }

    // Use the proxy for external URLs
    return `/api/image-proxy?url=${encodeURIComponent(src)}`;
  };

  const imageProps = {
    src: getImageSrc(),
    alt,
    className,
    onError: () => setImageError(true),
    priority,
    ...(fill ? { fill: true } : { width: width || 300, height: height || 400 })
  };

  return <Image {...imageProps} />;
};

export default ProxiedImage;