import { useState } from 'react'
import { Star, Loader2, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type BackendProduct } from '@/lib/mapping'
import { useProductReviews, useReviewEligibility, useCreateReview } from '../../hooks/useReviews'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface ProductTabsProps {
  product: BackendProduct
}

export function ProductTabs({ product }: ProductTabsProps) {
  const { isAuthenticated } = useAuth()
  const { data: reviewsResponse, isLoading: isReviewsLoading } = useProductReviews(product.id)
  const { data: eligibilityResponse } = useReviewEligibility(product.id, isAuthenticated)
  const createReviewMutation = useCreateReview(product.id)

  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'specifications'>(
    'description'
  )
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const reviews = reviewsResponse?.data || []
  const isEligible = eligibilityResponse?.data?.isPurchased || false

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createReviewMutation.mutate({ rating, comment }, {
      onSuccess: () => {
        setComment('')
        setRating(5)
      }
    })
  }

  return (
    <div className="w-full mt-16 pt-8 border-t border-neutral-200">
      {/* Tab Headers */}
      <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8">
        <button
          onClick={() => setActiveTab('description')}
          className={cn(
            'text-[18px] md:text-[22px] transition-colors relative pb-2',
            activeTab === 'description'
              ? 'font-bold text-black border-b-2 border-black'
              : 'text-neutral-500 hover:text-black font-medium'
          )}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('specifications')}
          className={cn(
            'text-[18px] md:text-[22px] transition-colors relative pb-2',
            activeTab === 'specifications'
              ? 'font-bold text-black border-b-2 border-black'
              : 'text-neutral-500 hover:text-black font-medium'
          )}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={cn(
            'text-[18px] md:text-[22px] transition-colors relative pb-2',
            activeTab === 'reviews'
              ? 'font-bold text-black border-b-2 border-black'
              : 'text-neutral-500 hover:text-black font-medium'
          )}
        >
          Reviews ({reviews.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'description' && (
          <div className="text-[15px] text-neutral-600 leading-relaxed max-w-4xl space-y-4">
            <p className="whitespace-pre-line">
              {product.description || 'No detailed description available.'}
            </p>
            {product.productName && (
              <div className="mt-6 p-6 bg-neutral-50 rounded-lg">
                <h4 className="font-bold text-black mb-3 italic">Highlights</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Original {product.brand?.brandName} {product.productName}
                  </li>
                  <li>Official product under {product.category?.name}</li>
                  <li>Premium quality and performance</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 rounded-sm overflow-hidden">
              <div className="bg-neutral-50 p-4 font-bold text-black">Brand</div>
              <div className="bg-white p-4 text-neutral-600">
                {product.brand?.brandName || 'Generic'}
              </div>
              <div className="bg-neutral-50 p-4 font-bold text-black">Category</div>
              <div className="bg-white p-4 text-neutral-600">
                {product.category?.name || 'Uncategorized'}
              </div>
              <div className="bg-neutral-50 p-4 font-bold text-black">Product Name</div>
              <div className="bg-white p-4 text-neutral-600">{product.productName}</div>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-12">
            {/* Review Form */}
            {isEligible && (
              <div className="bg-neutral-50 rounded-[24px] p-8 md:p-12 border border-neutral-100">
                <h3 className="text-[24px] font-black text-black mb-2">Write a Review</h3>
                <p className="text-neutral-500 mb-8 font-medium">Share your experience with this product.</p>
                
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-black uppercase tracking-wider text-[12px]">Rating</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={cn(
                            "size-8 flex items-center justify-center transition-all",
                            rating >= star ? "text-[#FFC107]" : "text-neutral-300"
                          )}
                        >
                          <Star className={cn("size-6", rating >= star ? "fill-current" : "")} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="font-bold text-black uppercase tracking-wider text-[12px]">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="What did you like or dislike?"
                      className="w-full min-h-[120px] bg-white border border-neutral-200 rounded-xl p-4 outline-none focus:border-black transition-colors resize-none"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={createReviewMutation.isPending}
                    className="bg-black text-white px-10 h-14 rounded-full font-bold hover:opacity-80 transition-all disabled:opacity-50"
                  >
                    {createReviewMutation.isPending ? <Loader2 className="animate-spin" /> : 'Post Review'}
                  </button>
                </form>
              </div>
            )}

            {!isEligible && isAuthenticated && (
              <div className="p-8 bg-neutral-50 rounded-[24px] border border-neutral-100 text-center">
                <p className="text-neutral-600 font-medium">
                  You can leave a review once your order for this product has been <span className="font-bold text-black">Delivered</span>.
                </p>
              </div>
            )}


            {!isAuthenticated && (
              <div className="p-8 bg-neutral-50 rounded-[24px] border border-neutral-100 text-center">
                <p className="text-neutral-600 font-medium">
                  Please sign in to write a review.
                </p>
              </div>
            )}

            {/* Reviews List */}
            <div className="flex flex-col gap-6">
              {isReviewsLoading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin text-neutral-300 size-8" />
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-20 bg-white border border-neutral-100 rounded-[24px]">
                  <MessageSquare className="size-12 text-neutral-200 mx-auto mb-4" />
                  <p className="text-neutral-400 font-medium">No reviews yet. Be the first to review!</p>
                </div>
              ) : (
                reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="border border-neutral-100 rounded-[24px] p-8 bg-white shadow-sm w-full"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="size-12 rounded-full bg-neutral-100 flex items-center justify-center font-bold text-neutral-500 uppercase">
                        {review.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-4">
                          <h4 className="font-bold text-[16px] text-black">
                            {review.user?.name}
                          </h4>
                          <div className="flex text-[#FFC107]">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="size-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <span className="text-[12px] text-neutral-400 font-medium">
                          Verified Purchase
                        </span>
                      </div>
                    </div>

                    <p className="text-[15px] text-neutral-600 leading-relaxed max-w-4xl mb-6">
                      {review.comment}
                    </p>

                    <div className="text-[12px] font-medium text-neutral-400">
                      Posted on {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
