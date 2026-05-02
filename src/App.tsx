import { Toaster } from '@/components/ui/sonner'
import AppRoutes from './routes/AppRoutes'
import ScrollToTop from '@/components/common/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </>
  )
}

export default App
