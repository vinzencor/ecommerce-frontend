import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function EmptyCart() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h2 className="text-[24px] font-bold mb-4">Your Shopping Cart is Empty</h2>
      <p className="text-neutral-500 mb-8">Add something to make me happy :)</p>
      <Link to="/products">
        <Button className="bg-black text-white hover:bg-neutral-800 rounded-full px-8">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
