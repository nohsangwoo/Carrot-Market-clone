import { useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'

const ImageWithFallback = ({ src, alt, ...rest }: ImageProps) => {
  const fallbackSrc =
    'https://imagedelivery.net/F970tsu1DA6roLNnxFl6kw/14c95c7b-1841-4fad-0d40-4730ad0b5d00/public'

  const [isError, setIsError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  useEffect(() => {
    if (currentSrc !== src) {
      setIsError(false)
      setCurrentSrc(src)
    }
  }, [currentSrc, src])

  return (
    <Image
      src={isError ? fallbackSrc : currentSrc}
      {...rest}
      alt={alt}
      onError={() => setIsError(true)}
    />
  )
}

export default ImageWithFallback
