'use client';

import { Button } from '../ui/button';
import { Cart } from '@/components/cart';
import { ShoppingCart } from 'lucide-react';
import MealCard from '@/components/meal-card';
import { CategoryFilter } from '@/components/category-filter';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useFetchMealsByCategory } from '@/hooks/use-reactquery-meal';
import React, { useState } from 'react';

export default function MealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { getMealsByCategory } = useFetchMealsByCategory(selectedCategory);

  if(!getMealsByCategory){
    return (
      <div className="">
        No Data Found...!!!🥺
      </div>
    )
  }
  return (
    <div className="min-h-screen w-full">
      {/* Mobile Cart Button - Fixed position */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen w-full">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Category Filter - Fixed at top */}
          <div className="flex-shrink-0 px-4 pt-4">
            <CategoryFilter
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          
          {/* Scrollable Meals Grid */}
          <ScrollArea className="flex-1 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pb-20 lg:pb-6">
              {
                getMealsByCategory.length > 0 ?   (
                  getMealsByCategory.map((meal) => {
                return <MealCard key={meal.slug} fetchedMeal={meal} />;
              })
                ):(
                  // We Include This Div If Incase There Are No Meals In That Category... 
                  <div className="">
                    No Meals Found...
                  </div>
                )
              }
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>

        {/* Desktop Cart Sidebar */}
        <aside className="hidden lg:block w-80 xl:w-96 border-l bg-muted/30 flex-shrink-0">
          <div className="h-full overflow-hidden">
            <Cart />
          </div>
        </aside>
      </div>
    </div>
  );
}