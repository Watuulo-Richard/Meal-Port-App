'use client';
import { useCategories } from '@/hooks/use-reactquery-category';
import {
  Grid,
  Coffee,
  Soup,
  UtensilsCrossed,
  ChefHat,
  Sandwich,
} from 'lucide-react';
import { useState, Dispatch, SetStateAction } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

const categories = [
  { icon: Grid },
  { icon: Coffee },
  { icon: Soup },
  { icon: UtensilsCrossed },
  { icon: ChefHat },
  { icon: Sandwich },
];

export function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
}) {
  const { allCategories } = useCategories();

  return (
    <div className="mb-4 w-full">
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          dragFree: true, // Allow free dragging on mobile
        }}
        className="w-full max-w-[18.5rem] sm:max-w-sm md:max-w-full"
      >
        <CarouselContent className="-ml-1 md:-ml-2">
          {/* All Categories Button */}
          <CarouselItem className="pl-1 md:pl-2 basis-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex flex-col items-center p-2 md:p-3 rounded-xl min-w-[80px] md:min-w-[100px] ${
                selectedCategory === 'all'
                  ? 'bg-green-50 text-green-600'
                  : 'bg-white'
              } border cursor-pointer hover:bg-green-50 transition-colors`}
            >
              <Grid className="h-4 w-4 md:h-6 md:w-6 mb-1" />
              <span className="text-xs font-medium">All</span>
            </button>
          </CarouselItem>

          {/* Dynamic Categories */}
          {allCategories.map((category, index) => (
            <CarouselItem
              key={category.slug}
              className="pl-1 md:pl-2 basis-auto"
            >
              <button
                onClick={() => setSelectedCategory(category.slug)}
                className={`flex flex-col items-center p-2 md:p-3 rounded-xl min-w-[80px] md:min-w-[100px] ${
                  selectedCategory === category.slug
                    ? 'bg-green-50 text-green-600'
                    : 'bg-white'
                } border cursor-pointer hover:bg-green-50 transition-colors`}
              >
                {/* Icon mapping */}
                {(() => {
                  const Icon = categories[index % categories.length].icon;
                  return <Icon className="h-4 w-4 md:h-6 md:w-6 mb-1" />;
                })()}
                <span className="text-xs font-medium text-center leading-tight">
                  {category.name}
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons - Hidden on mobile for better touch experience */}
        <CarouselPrevious className="hidden md:flex -left-3 lg:-left-4" />
        <CarouselNext className="hidden md:flex -right-3 lg:-right-4" />
      </Carousel>
    </div>
  );
}