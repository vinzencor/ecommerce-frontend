import HeroSection from '../components/HeroSection'
import { FeaturesBanner } from '../components/FeaturesBanner'
import { RecommendedDeals } from '../components/RecommendedDeals'
import { BrandOffers } from '../components/BrandOffers'
import { DealsOfTheDay } from '../components/DealsOfTheDay'
import { BestSellers } from '../components/BestSellers'
import { FeaturedPromo } from '../components/FeaturedPromo'
import { CategorySection } from '../components/CategorySection'
import { useHomeData } from '../hooks/useHomeData'

function HomePage() {
  const { data, isLoading, error } = useHomeData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-2">
          <div className="size-8 border-2 border-neutral-200 border-t-black rounded-full animate-spin" />
          <span className="text-[13px] text-neutral-500 font-medium">Loading Storefront...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Failed to load data</h2>
          <p className="text-neutral-500 text-sm mb-4">Please check your backend connection.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-full text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <CategorySection categories={data?.categories || []} />
      <HeroSection banners={data?.Banner || []} />
      <FeaturesBanner />
      <RecommendedDeals products={data?.featuredProducts || []} />
      <BrandOffers />
      <DealsOfTheDay products={data?.dealsOfTheDay || []} />
      <BestSellers products={data?.featuredProducts || []} />
      <FeaturedPromo />
    </div>
  )
}

export default HomePage
