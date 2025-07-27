"use client"

import { Button } from "../ui/button"
import { Cart } from "@/components/cart"
import MealCard from "@/components/meal-card"
import { CategoryFilter } from "@/components/category-filter"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { ShoppingCart } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useFetchMealsByCategory } from "@/hooks/use-reactquery-meal"
import { motion, AnimatePresence } from "framer-motion"
import { Session } from "next-auth"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
}

const floatingButtonVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

const sidebarVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.3,
    },
  },
}

const loadingVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

const noDataVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function MealsPage({session}:{session:Session | null}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const { getMealsByCategory } = useFetchMealsByCategory(selectedCategory)

  if (!getMealsByCategory) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        variants={noDataVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div
            variants={loadingVariants}
            animate="animate"
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-muted-foreground">Loading delicious meals...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="min-h-screen w-full" variants={containerVariants} initial="hidden" animate="visible">
      {/* Mobile Cart Button - Fixed position */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <motion.div
              variants={floatingButtonVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              whileTap="tap"
            >
              <Button size="lg" className="bg-green-600 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 1 }}>
                  <ShoppingCart className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-96">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Cart session={session} />
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen w-full">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Category Filter - Fixed at top */}
          <motion.div className="flex-shrink-0 px-4 pt-4" variants={itemVariants}>
            <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          </motion.div>

          {/* Scrollable Meals Grid */}
          <ScrollArea className="flex-1 px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                className="grid grid-cols-1 sm:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pb-20 lg:pb-6"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {getMealsByCategory.length > 0 ? (
                  getMealsByCategory.map((meal, index) => (
                    <motion.div
                      key={meal.slug}
                      variants={cardVariants}
                      custom={index}
                      whileHover={{
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MealCard fetchedMeal={meal} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full flex items-center justify-center py-20"
                    variants={noDataVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="text-6xl mb-4"
                      >
                        🍽️
                      </motion.div>
                      <p className="text-lg text-muted-foreground">No meals found in this category</p>
                      <motion.p
                        className="text-sm text-muted-foreground mt-2"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        Try selecting a different category
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>

        {/* Desktop Cart Sidebar */}
        <motion.aside
          className="hidden lg:block w-80 xl:w-96 border-l bg-muted/30 flex-shrink-0"
          variants={sidebarVariants}
        >
          <div className="h-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Cart session={session}/>
            </motion.div>
          </div>
        </motion.aside>
      </div>
    </motion.div>
  )
}
