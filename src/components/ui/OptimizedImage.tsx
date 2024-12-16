'use client';

import { FC } from 'react';
import Image, { ImageProps } from 'next/image';
import { shimmer, toBase64, defaultBlurDataURL } from '@/lib/image-utils';

interface OptimizedImageProps extends Omit<ImageProps, 'blurDataURL'> {
  fallback?: string;
  usePlaceholder?: boolean;
}

export const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  priority = false,
  fallback = defaultBlurDataURL,
  usePlaceholder = true,
  ...props
}) => {
  // Don't use blur placeholder for SVGs
  const isSvg = typeof src === 'string' && src.endsWith('.svg');
  const placeholderProps = usePlaceholder && !isSvg
    ? {
        placeholder: "blur" as const,
        blurDataURL: `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`,
      }
    : {};

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      priority={priority}
      {...placeholderProps}
      {...props}
      onError={(e) => {
        const img = e.target as HTMLImageElement;
        if (img.src !== fallback) {
          img.src = fallback;
        }
      }}
    />
  );
}; 