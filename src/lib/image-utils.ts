export const imageKitLoader = ({ src, width, quality }) => {
  return `https://ik.imagekit.io/youraccount/${src}?tr=w-${width},q-${quality || 75}`
} 