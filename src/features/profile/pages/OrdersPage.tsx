import ProfileSidebar from '../components/ProfileSidebar'
import OrderHistoryTable from '../components/OrderHistoryTable'

export default function OrdersPage() {
  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-12 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <ProfileSidebar />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 flex flex-col gap-8 pb-20">
          <div className="flex flex-col gap-1.5 mb-2">
            <h1 className="text-[28px] md:text-[32px] font-bold text-black tracking-tight">
              Order History
            </h1>
            <p className="text-[14px] md:text-[15px] text-neutral-400 font-medium leading-relaxed max-w-3xl">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
              euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
          </div>

          <OrderHistoryTable />
        </main>
      </div>
    </div>
  )
}
