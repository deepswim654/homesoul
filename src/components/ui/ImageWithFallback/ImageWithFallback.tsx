'use client';

import { FC, useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export const ImageWithFallback: FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallbackSrc = '/assets/images/fallback-image.jpg',
  className,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    setError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn('relative', className)}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-t-xl md:rounded-tr-none md:rounded-l-xl" />
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-t-xl md:rounded-tr-none md:rounded-l-xl">
          <div className="text-center p-4">
            <span className="text-sm text-gray-500 block">Unable to load image</span>
            <span className="text-xs text-gray-400">{alt}</span>
          </div>
        </div>
      )}
    </div>
  );
}; 