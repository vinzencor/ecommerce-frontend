import { useState } from 'react'
import { cn } from '@/lib/utils'
import { type BackendProduct } from '@/lib/mapping'

interface ProductGalleryProps {
  product: BackendProduct
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const primaryVariant = product.variants.find((v) => v.isPrimary) || product.variants[0]
  const images = primaryVariant?.images?.map((img) => img.imageUrl) || []

  const [activeImage, setActiveImage] = useState(0)

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square border border-neutral-200 rounded-lg flex items-center justify-center bg-neutral-50 text-neutral-400">
        No images available
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Image */}
      <div className="w-full aspect-square border border-neutral-200 rounded-lg p-4 md:p-8 flex items-center justify-center bg-white overflow-hidden">
        <img
          src={images[activeImage]}
          alt={product.productName}
          className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
        {images.map((img, idx) => (
          <button
            key={`${img}-${idx}`}
            onClick={() => setActiveImage(idx)}
            className={cn(
              'shrink-0 w-20 h-20 md:w-24 md:h-24 border rounded-lg p-2 flex items-center justify-center bg-white transition-all',
              activeImage === idx
                ? 'border-black ring-1 ring-black'
                : 'border-neutral-200 hover:border-neutral-400'
            )}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
