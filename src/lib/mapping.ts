import type { DealCardProps } from '@/components/common/cards/DealCard'

export interface BackendProduct {
  id: string
  productName: string
  description?: string
  brand?: {
    brandName: string
  }
  category?: {
    id?: string
    name: string
  }
  variants: Array<{
    id: string
    sku?: string
    price: number
    costPrice?: number
    discount?: number
    stock: number
    isPrimary: boolean
    images: Array<{
      imageUrl: string
      isPrimary: boolean
    }>
  }>
}

interface BackendDeal {
  product: BackendProduct
  discountValue?: number
}

export const mapProductToDealCard = (product: BackendProduct): DealCardProps & { id: string } => {
  const primaryVariant = product.variants.find((v) => v.isPrimary) || product.variants[0]
  const primaryImage =
    primaryVariant?.images.find((img) => img.isPrimary)?.imageUrl ||
    primaryVariant?.images[0]?.imageUrl ||
    ''

  return {
    id: product.id,
    image: primaryImage,
    brand: product.brand?.brandName || product.category?.name || 'Generic',
    title: product.productName,
    rating: 4.5 + Math.random() * 0.5, // Mock rating as it's not in DB yet
    price: primaryVariant?.price || 0,
    originalPrice:
      primaryVariant?.costPrice ||
      (primaryVariant?.price ? Math.round(primaryVariant.price * 1.5) : 0),
    discount: primaryVariant?.discount || 0,
  }
}

export const mapProductToCardProps = (product: BackendProduct) => {
  const primaryVariant = product.variants.find((v) => v.isPrimary) || product.variants[0]
  const primaryImage =
    primaryVariant?.images.find((img) => img.isPrimary)?.imageUrl ||
    primaryVariant?.images[0]?.imageUrl ||
    ''

  return {
    id: product.id,
    image: primaryImage,
    name: product.productName,
    brand: product.brand?.brandName || product.category?.name || 'Generic',
    price: primaryVariant?.price || 0,
    originalPrice:
      primaryVariant?.costPrice ||
      (primaryVariant?.price ? Math.round(primaryVariant.price * 1.5) : 0),
    discount: primaryVariant?.discount || 0,
    isTrending: !!product.variants.find((v) => v.discount && v.discount > 50),
  }
}

export const mapProductToSellerCard = (product: BackendProduct) => {
  const primaryVariant = product.variants.find((v) => v.isPrimary) || product.variants[0]
  const primaryImage =
    primaryVariant?.images.find((img) => img.isPrimary)?.imageUrl ||
    primaryVariant?.images[0]?.imageUrl ||
    ''

  return {
    id: product.id,
    image: primaryImage,
    brand: product.brand?.brandName || product.category?.name || 'Generic',
    name: product.productName,
    rating: 4.5 + Math.random() * 0.5,
    price: primaryVariant?.price || 0,
    originalPrice:
      primaryVariant?.costPrice ||
      (primaryVariant?.price ? Math.round(primaryVariant.price * 1.5) : 0),
    discount: primaryVariant?.discount || 0,
  }
}

export const mapDealToSellerCard = (deal: BackendDeal) => {
  const product = deal.product
  const cardProps = mapProductToSellerCard(product)

  return {
    ...cardProps,
    discount: deal.discountValue || cardProps.discount,
  }
}
