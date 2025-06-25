'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MealTypes } from '@/types/types';
import { useCartState } from '@/store/store';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';

const meal = {
  discount: '20% Off',
  isVeg: true,
};

export default function MealCard({ fetchedMeal }: { fetchedMeal: MealTypes }) {
  const [imageIndex, setImageIndex] = useState(0);
  const { cartArray, handleAddToCart, handleRemoveFromCart } = useCartState();
  const [quantity, setQuantity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const mealToBeAddedInCart = cartArray.find(
    (meal) => meal.slug === fetchedMeal.slug,
  );

  function addToCart() {
    const cartObjectStructure = {
      name: fetchedMeal.name,
      slug: fetchedMeal.slug,
      price: fetchedMeal.price,
      images: fetchedMeal.images,
      categoryId: fetchedMeal.categoryId,
      numberOfPlates: quantity,
    };
    handleAddToCart(cartObjectStructure);
  }

  function handleQuantityIncrement() {
    setQuantity((prev) => prev + 1);
  }

  function handleQuantityDecrement() {
    if (quantity <= 0) return;
    setQuantity((prev) => prev - 1);
  }

  const nextImage = () => {
    if (imageIndex === fetchedMeal.images.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const prevImage = () => {
    if (imageIndex === 0) {
      setImageIndex(fetchedMeal.images.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  return (
    <Card
      className={`w-full max-w-full bg-white rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-lg -translate-y-1' : 'shadow-md'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image section */}
        <div className="relative rounded-t-xl overflow-hidden">
          {/* Discount badge */}
          <Badge className="absolute top-2 left-2 md:top-3 md:left-3 z-10 bg-orange-400 text-white text-xs px-2 py-1">
            {meal.discount}
          </Badge>

          {/* Image carousel */}
          <div className="h-32 sm:h-40 w-full relative">
            <Link href={`/meal-detail-page/${fetchedMeal.slug}`}>
              <img
                src={fetchedMeal.images?.[imageIndex] || '/placeholder.svg'}
                alt={fetchedMeal.name}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </Link>
          </div>

          {/* Carousel buttons - only show if multiple images and on hover/touch */}
          {fetchedMeal.images.length > 1 &&
            (isHovered || window.innerWidth < 768) && (
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-1 sm:px-2 -translate-y-1/2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/90 p-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/90 p-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            )}

          {/* Image indicators */}
          {fetchedMeal.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {fetchedMeal.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                    index === imageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info section */}
        <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
          {/* Product name */}
          <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">
            {fetchedMeal.name}
          </h3>

          {/* Price and veg indicator */}
          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-xl font-bold text-green-600">
              ${fetchedMeal.price}
            </span>
            {meal.isVeg && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                {/* <span className="text-xs text-gray-600">Veg</span> */}
              </div>
            )}
          </div>

          {/* Quantity controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Button
              size="sm"
              variant="outline"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0"
              onClick={handleQuantityDecrement}
              // disabled={quantity <= 0}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-medium w-6 sm:w-8 text-center text-sm sm:text-base">
              {quantity}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0"
              onClick={handleQuantityIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Add to cart button */}
          {mealToBeAddedInCart ? (
            <Button
              variant="outline"
              className="w-full border border-red-300 hover:bg-red-600 transition-all duration-300 text-xs sm:text-sm text-red-600 hover:text-white py-2"
              onClick={() => handleRemoveFromCart(fetchedMeal.slug)}
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Remove from Cart
            </Button>
          ) : (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm py-2 disabled:opacity-50"
              onClick={() => addToCart()}
              disabled={quantity === 0}
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Add to Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
