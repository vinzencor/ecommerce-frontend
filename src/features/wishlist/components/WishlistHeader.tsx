interface WishlistHeaderProps {
  count: number
}

export default function WishlistHeader({ count }: WishlistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-14">
      <div className="space-y-1.5 flex flex-col">
        <h1 className="text-[26px] md:text-[30px] font-bold text-black">
          Your Wishlist/Saved Items
        </h1>
        <p className="text-[14px] md:text-[16px] text-neutral-400 font-medium">
          Collection of products saved for later
        </p>
      </div>

      <div className="flex items-center gap-2 text-right">
        <span className="text-[14px] font-black text-black tracking-tight">{count} items</span>
      </div>
    </div>
  )
}
