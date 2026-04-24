import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav'

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-clip pb-16 md:pb-0">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}

export default MainLayout
