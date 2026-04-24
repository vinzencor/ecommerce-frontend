import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type BackendProduct } from '@/lib/mapping'

const REVIEWS = [
  {
    id: 1,
    name: 'Mike Johnson',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    verified: true,
    rating: 5,
    text: 'Great product! The quality is top-notch and it arrived earlier than expected.',
    time: '2 days ago',
  },
]

interface ProductTabsProps {
  product: BackendProduct
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'specifications'>(
    'description'
  )

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
          Reviews (1)
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
          <div className="flex flex-col gap-4">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="border border-neutral-200 rounded-lg p-6 bg-white shrink-0 shadow-sm w-full"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-4">
                      <h4 className="font-bold text-[14px] text-black leading-none">
                        {review.name}
                      </h4>
                      <div className="flex text-[#FFC107]">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="size-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    {review.verified && (
                      <span className="text-[11px] text-neutral-400 font-medium">
                        Verified User
                      </span>
                    )}
                  </div>
                </div>

                {/* Body */}
                <p className="text-[13px] text-neutral-600 leading-relaxed max-w-4xl mb-4">
                  {review.text}
                </p>

                {/* Footer */}
                <div className="flex items-center gap-4 text-[12px] font-medium text-neutral-500">
                  <button className="hover:text-black transition-colors">Like</button>
                  <button className="hover:text-black transition-colors">Reply</button>
                  <span>{review.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
