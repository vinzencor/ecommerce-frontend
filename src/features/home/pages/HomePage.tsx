import HeroSection from '../components/HeroSection'
import { FeaturesBanner } from '../components/FeaturesBanner'
import { RecommendedDeals } from '../components/RecommendedDeals'
import { BrandOffers } from '../components/BrandOffers'
import { DealsOfTheDay } from '../components/DealsOfTheDay'
import { BestSellers } from '../components/BestSellers'
import { CategorySection } from '../components/CategorySection'
import { useHomeData } from '../hooks/useHomeData'

export default function HomePage() {
  const { data, isLoading, error } = useHomeData()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="size-12 border-4 border-[#EDEDFD] rounded-full" />
            <div className="size-12 border-4 border-t-[#505081] border-transparent rounded-full animate-spin absolute inset-0" />
          </div>
          <span className="text-[15px] text-[#666] font-bold animate-pulse">
            Setting up your shop...
          </span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-md p-10 bg-[#F5F5F5] rounded-[22px] border border-[#EDEDFD] shadow-sm">
          <div className="size-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#EDEDFD]">
            <span className="text-2xl">😕</span>
          </div>
          <h2 className="text-2xl font-black text-[#291F1F] mb-3">Oops! Something went wrong</h2>
          <p className="text-[#666] text-[15px] mb-8 font-medium">
            We're having trouble reaching our servers. Please give it another try.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full h-12 bg-[#291F1F] text-white rounded-full text-[14px] font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md"
          >
            Retry Connection
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
    </div>
  )
}
