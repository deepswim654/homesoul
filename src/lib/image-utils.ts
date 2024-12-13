interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export const imageKitLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `https://ik.imagekit.io/youraccount/${src}?tr=w-${width},q-${quality || 75}`
} 