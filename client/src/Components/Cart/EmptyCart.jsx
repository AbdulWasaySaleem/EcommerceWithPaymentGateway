import { ArrowRight, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any items to your cart yet. Start
          shopping to fill it up!
        </p>
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div>
            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Heart className="w-4 h-4" />
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart