'use client';

import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartTypes, useCartState } from '@/store/store';

export default function CartCard({ cartItem }: { cartItem: CartTypes }) {
  const {
    cartArray,
    handleRemoveFromCart,
    handleIncrement,
    handleDecrement,
  } = useCartState();

  // Safe image access with fallbacks
  function getImageSrc() {
    if(!cartItem.images || cartItem.images.length === 0) {
      return '/placeholder.png'
    } else {
      return cartItem.images[1] || cartItem.images[0] || '/placeholder.png'
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <img
            src={getImageSrc()}
            alt={cartItem.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {cartItem.name}
            </h4>
            <div className="flex items-center justify-between mt-2">
              <span className="text-green-600 font-bold text-xs sm:text-sm">
                ${cartItem.price.toFixed(2)}
              </span>

              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full border-gray-300 hover:border-gray-400"
                    onClick={() => handleDecrement(cartItem.slug)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <span className="text-xs font-medium min-w-[1.5rem] text-center">
                    {cartItem.numberOfPlates}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 w-7 p-0 rounded-full border-gray-300 hover:border-gray-400"
                    onClick={() => handleIncrement(cartItem.slug)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Delete Button */}
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                  onClick={() => handleRemoveFromCart(cartItem.slug)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {cartArray.length === 0 && (
        <div className="text-center py-8 text-gray-500">Your cart is empty</div>
      )}
    </div>
  );
}
