'use client';
import CartCard from './cart-card';
import { useCartState } from '@/store/store';
import { ScrollArea } from './ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from './ui/dialog';
import OrderForm from './frontend/check-out-form';
import { Session } from 'next-auth';

export function Cart({session}:{session:Session | null}) {
  const { cartArray } = useCartState();

  const subtotal = cartArray.reduce(
    (acc, item) => acc + item.price * item.numberOfPlates,
    0,
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  return (
    <div className="w-[380px] bg-white/95 border-l flex flex-col h-full rounded-lg">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Your Food Cart</h2>
          <p className="text-sm text-gray-500">
            There Are {cartArray.length} Meals In Your Cart
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <Edit2 className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <ScrollArea className="h-[400px] pr-4">
          {cartArray.map((cartItem) => {
            return <CartCard key={cartItem.id} cartItem={cartItem} />;
          })}
        </ScrollArea>
      </div>
      <div className="border-t p-4">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Sub Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax 5%</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12">
              Place Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[425px] md:max-w-[1025px]">
              <OrderForm total={total} tax={tax} subtotal={subtotal} session={session}/>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
