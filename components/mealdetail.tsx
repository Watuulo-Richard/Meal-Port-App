'use client';
// WinterTopProductDetail.tsx
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Globe,
  Shield,
  Award,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  Star,
  Truck,
  Bike,
} from 'lucide-react';
import { useSingleMealQuery } from '@/hooks/use-reactquery-meal';
import { MealProduct } from '@/lib/generated/prisma';

// Types
interface ProductImage {
  id: string;
  src: string;
  alt: string;
}

interface ProductColor {
  id: string;
  name: string;
  value: string;
  available: boolean;
}

interface ProductSize {
  id: string;
  label: string;
  available: boolean;
}

interface Review {
  id: string;
  author: string;
  authorImage: string;
  rating: number;
  date: string;
  comment: string;
}

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  features: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  reviews: Review[];
  description: string;
  shipping: {
    free: boolean;
    worldwide: boolean;
    estimatedDelivery: string;
  };
  payment: {
    secure: boolean;
    methods: string[];
  };
  inStock: boolean;
  sku: string;
}

// Mock data
const productData: Product = {
  id: 'winter-top-green-001',
  name: 'The winter top for female, green',
  brand: "Jenny's Closets",
  price: 49,
  originalPrice: 99,
  discount: 50,
  rating: 4.8,
  reviewCount: 157,
  images: [
    {
      id: 'img-1',
      src: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      alt: 'Green winter top front view',
    },
    {
      id: 'img-2',
      src: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80',
      alt: 'Green winter top side view',
    },
    {
      id: 'img-3',
      src: 'https://images.unsplash.com/photo-1551163943-3f7fb299fe77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      alt: 'Green winter top back view',
    },
    {
      id: 'img-4',
      src: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      alt: 'Green winter top detail view',
    },
  ],
  features: [
    'Made with full cotton',
    'Slim fit for any body',
    'Quality control by JC',
  ],
  colors: [
    {
      id: 'blue',
      name: 'Royal Blue',
      value: '#4F46E5',
      available: true,
    },
    {
      id: 'navy',
      name: 'Navy',
      value: '#1E293B',
      available: true,
    },
    {
      id: 'green',
      name: 'Emerald Green',
      value: '#047857',
      available: true,
    },
    {
      id: 'red',
      name: 'Ruby Red',
      value: '#BE123C',
      available: false,
    },
  ],
  sizes: [
    { id: 'xs', label: 'XS', available: true },
    { id: 's', label: 'S', available: true },
    { id: 'm', label: 'M', available: true },
    { id: 'l', label: 'L', available: false },
    { id: 'xl', label: 'XL', available: true },
  ],
  reviews: [
    {
      id: 'review-1',
      author: 'Kristin Watson',
      authorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      rating: 5,
      date: 'March 14, 2021',
      comment:
        'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
    },
    {
      id: 'review-2',
      author: 'Jenny Wilson',
      authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      rating: 5,
      date: 'January 28, 2021',
      comment:
        'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
    },
    {
      id: 'review-3',
      author: 'Bessie Cooper',
      authorImage: 'https://randomuser.me/api/portraits/women/53.jpg',
      rating: 4,
      date: 'January 11, 2021',
      comment:
        'You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the changes.',
    },
  ],
  description:
    'This elegant winter top features a flattering V-neck design with delicate floral pattern. Made from premium cotton fabric, it offers both comfort and style. The three-quarter length sleeves with subtle bow details at the cuffs add a feminine touch. Perfect for casual outings or semi-formal events during the cooler months.',
  shipping: {
    free: true,
    worldwide: true,
    estimatedDelivery: '3-5 business days',
  },
  payment: {
    secure: true,
    methods: ['Credit Card', 'PayPal', 'Apple Pay'],
  },
  inStock: true,
  sku: 'JC-WT-G-001',
};

export default function MealDetail({ singleDetailedMeal, slug }: { singleDetailedMeal:MealProduct | null, slug: string }) {
  const { singleMeal } = useSingleMealQuery(slug);

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('green');
  const [selectedSize, setSelectedSize] = useState('m');
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Get visible reviews based on showAllReviews state
  const visibleReviews = showAllReviews
    ? productData.reviews
    : productData.reviews.slice(0, 3);

  // Format price with currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle image navigation
  const nextImage = () => {
    setActiveImage((prev) => {
      if (prev === (singleDetailedMeal?.images?.length ?? 0) - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const prevImage = () => {
    setActiveImage((prev) => {
      if (prev === 0) {
        return singleDetailedMeal?.images?.length ?? -1;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-900">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400 self-center" />
        <Link href="/meals" className="hover:text-gray-900">
          Meals
        </Link>
        <ChevronRight className="h-4 w-4 mx-1 text-gray-400 self-center" />
        {/* <span className="text-gray-900">Meal Port's</span> */}
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Product Image Gallery */}
        <div className="flex flex-col">
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
            <div className="relative h-96 sm:h-[500px] overflow-hidden flex items-center justify-center">
              <Image
                src={singleDetailedMeal?.images[activeImage] || '/placeholder.svg'}
                alt={singleDetailedMeal?.images[activeImage] || '/placeholder.svg'}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Zoom Button */}
              <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white focus:outline-none">
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 overflow-auto pb-2 scrollbar-thin">
            {singleDetailedMeal?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative flex-shrink-0 h-20 w-20 rounded-md overflow-hidden ${
                  activeImage === index
                    ? 'ring-2 ring-gray-200'
                    : 'ring-1 ring-gray-200 hover:ring-gray-300'
                }`}
              >
                <Image
                  src={image}
                  alt={image}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Meal Port's - {singleDetailedMeal?.name}
          </h1>

          {/* Rating */}
          <div className="mt-3 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`h-5 w-5 ${
                    index < Math.floor(productData.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : index < productData.rating
                      ? 'text-yellow-400 fill-yellow-400 opacity-60'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-600">
              {productData.reviewCount} Reviews
            </p>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-center">
            <p className="text-3xl font-bold text-gray-900">
              {/* {formatPrice(singleMeal.price)} */}
            </p>
            {productData.discount > 0 && (
              <>
                <p className="ml-3 text-lg text-gray-500 line-through">
                  {formatPrice(productData.originalPrice)}
                </p>
                <p className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-green-100 text-green-800">
                  Save {productData.discount}% right now
                </p>
              </>
            )}
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
            <ul className="mt-2 space-y-2">
              {singleDetailedMeal?.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-2"></span>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          {/* Colors */}
          {/* <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Colors</h3>
            <div className="mt-2 flex space-x-2">
              {productData.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => color.available && setSelectedColor(color.id)}
                  disabled={!color.available}
                  className={`
                    relative inline-flex items-center justify-center h-10 w-10 rounded-full border p-0.5
                    ${
                      selectedColor === color.id
                        ? 'ring-2 ring-offset-2 ring-gray-900'
                        : ''
                    }
                    ${!color.available ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  title={color.name}
                >
                  <span
                    className="rounded-full h-full w-full"
                    style={{ backgroundColor: color.value }}
                  ></span>
                  {!color.available && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div> */}

          {/* Sizes */}
          {/* <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Size</h3>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Size guide
              </button>
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2">
              {productData.sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => size.available && setSelectedSize(size.id)}
                  disabled={!size.available}
                  className={`
                    py-2 px-3 border rounded-md text-sm font-medium
                    ${
                      selectedSize === size.id
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                    }
                    ${
                      !size.available
                        ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                        : ''
                    }
                  `}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Quantity and Add to Cart */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex border border-gray-300 rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>

            <button className="flex-1 border border-emerald-200 hover:bg-emerald-50 text-emerald-600 py-3 px-6 rounded-md font-medium flex items-center justify-center transition duration-150">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to cart
            </button>

            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-500">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center">
              <Bike className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-sm text-gray-600">Free Delivery</p>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-sm text-gray-600">100% Secure Payment</p>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-gray-500 mr-2" />
              <p className="text-sm text-gray-600">Made by the Professionals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Description, Reviews, Support */}
      <div className="mt-16 border-t border-gray-200 pt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['description', 'reviews', 'support'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  capitalize py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab}
                {tab === 'reviews' && ` (${productData.reviewCount})`}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">{singleDetailedMeal?.description}</p>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {visibleReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-8 last:border-0"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={review.authorImage}
                        alt={review.author}
                        className="h-12 w-12 rounded-full object-cover"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              className={`h-4 w-4 ${
                                index < review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {review.author}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {review.date}
                      </p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {productData.reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {showAllReviews ? 'Show less reviews' : 'Load more reviews'}
                </button>
              )}
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Shipping Information
                </h3>
                <p className="mt-2 text-gray-600">
                  We offer {productData.shipping.free ? 'free' : 'standard'}{' '}
                  shipping{' '}
                  {productData.shipping.worldwide
                    ? 'worldwide'
                    : 'to select countries'}
                  . Estimated delivery time is{' '}
                  {productData.shipping.estimatedDelivery} after your order is
                  processed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Returns & Exchanges
                </h3>
                <p className="mt-2 text-gray-600">
                  Not satisfied with your purchase? You can return or exchange
                  your items within 30 days of delivery. Please note that items
                  must be in their original condition with tags attached.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Contact Us
                </h3>
                <p className="mt-2 text-gray-600">
                  For any questions or concerns, please contact our customer
                  support team at support@jennysclosets.com or call us at +1
                  (800) 123-4567.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
