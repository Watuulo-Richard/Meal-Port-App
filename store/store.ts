import { persist } from "zustand/middleware";
import { create } from 'zustand'
import { toast } from "sonner";

export type CartTypes = {
  name:              string;
  slug:              string;
  images:            string[];
  price:             number;
  numberOfPlates:    number;
  categoryId:        string;
}

type CartState = {
    cartArray: CartTypes[];
    handleAddToCart(meal: CartTypes): void,
    handleRemoveFromCart(slug: string): void,
    handleIncrement(slug: string): void,
    handleDecrement(slug: string): void,
    handleClear(): void
}

export const useCartState = create<CartState>() (
    persist(
        (set, get) => ({
            cartArray:[],

            handleAddToCart(meal: CartTypes) {
                const cartStore = get().cartArray
                const existingMealInCart = cartStore.find((item) => item.slug === meal.slug)
                if(existingMealInCart) {
                    toast.error('Meal Already In Cart')
                } else {
                    // const cartStore = get().cartArray --> you choose not this by not writing this line because we are still in the same function and still we can access the array
                    set({cartArray:[...cartStore, meal]})
                    toast.success('Meal Has Been Added To Your Cart Successfully')
                }
            },
            handleRemoveFromCart(slug) {
                const cartStore = get().cartArray
                const filteredMeal = cartStore.filter((item)=>item.slug !== slug)
                set({cartArray:filteredMeal})
            },
            handleIncrement(slug) {
                const cartStore = get().cartArray
                const mealInCart = cartStore.find((item) => item.slug === slug)
                if(mealInCart) {
                    mealInCart.numberOfPlates += 1;
                    set({cartArray:cartStore})
                }
            },
            handleDecrement(slug) {
                const cartStore = get().cartArray
                const mealInCart = cartStore.find((item) => item.slug === slug)
                if(mealInCart) {
                    mealInCart.numberOfPlates -= 1;
                    set({cartArray: cartStore})
                }
            },
            handleClear() {
                set({cartArray:[]})
            }
        }),
        {
            name: "local-storage", // unique name for storage
        }
    )
)