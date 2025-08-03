'use client';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2, ShoppingCart } from 'lucide-react';
import { orderSchema, OrderTypes } from '@/schema/schema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { useCartState } from '@/store/store';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { baseUrl } from '@/types/types';
import { Session } from 'next-auth';
import { Origami } from './order-icon';

export default function OrderForm({
  tax,
  subtotal,
  total,
  session,
}: {
  tax: number;
  subtotal: number;
  total: number;
  session: Session | null;
}) {
  const { cartArray } = useCartState();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderTypes>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  async function handleOrder(orderData: OrderTypes) {
    orderData.userId = session?.user.id;
    const orderDetails = {
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phone: orderData.phone,
      orderItems: cartArray,
      totalAmount: total,
      userId: orderData.userId,
    };
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/orderAPI`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });
      console.log(orderDetails);
      if (response.ok) {
        setLoading(false);
        console.log(response);
        toast.success('Order Was Made Successfully...✅');
        reset();
      } else {
        console.log(response);
        setLoading(false);
        toast.error('Failed To Make An Order');
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Internet Error, Please Try Again...!!!❌');
    }
  }

  return (
    <div className="p-4 md:p-2">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="text-center pb-2">
          {/* <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Product Creator
            </h1>
          </div> */}
          <p className="text-green-600 text-2xl font-bold border-b-2 border-green-600">
            Create beautiful product listings with professional validation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-4">
          {/* Form Section */}
          <Card className=" border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 ">
                <Origami className="h-5 w-5" />
                Order Details
              </CardTitle>
              <CardDescription className="text-blue-100">
                Fill in the information below to complete your order
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <form
                onSubmit={handleSubmit(handleOrder)}
                className="space-y-6 p-4"
              >
                <div>
                  <Label className="text-green-700 font-semibold">
                    First Name
                  </Label>
                  <Input
                    placeholder="Enter first name..."
                    className="!border-green-300 focus:!border-green-500 focus:!ring-green-500"
                    {...register('firstName', { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">
                      First Name Is Required...
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <Label className="text-green-700 font-semibold">
                    Last Name
                  </Label>

                  <Input
                    placeholder="Enter your last name..."
                    className="!border-green-300 focus:!border-green-500 focus:!ring-green-500"
                    {...register('lastName', { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">
                      Last Name Is Required...
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <Label className="text-green-700 font-semibold">
                    Email Address
                  </Label>

                  <Input
                    placeholder="Enter your email address..."
                    className="!border-green-300 focus:!border-green-500 focus:!ring-green-500"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      Email Address Is Required...
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-green-700 font-semibold">Phone</Label>
                  <Input
                    placeholder="Enter your phone number..."
                    className="!border-green-300 focus:!border-green-500 focus:!ring-green-500"
                    {...register('phone', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      Phone address is required...
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  {loading ? (
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Loader2 className="mr-2 h-4 w-4 text-white animate-spin" />
                      Making An Order, Please Wait...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Make An Order
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
          <Card
            data-animate
            className=" space-y-6  p-2 transition duration-700"
            style={{ transitionDelay: '.1s' }}
          >
            {/* <!-- Header --> */}
            <div className="flex items-center gap-3">
              <span id="cart-icon" className="shrink-0 w-6 h-6 text-red">
                <ShoppingCart className="text-green-600" />
              </span>
              <h2 className="text-2xl text-green-600 tracking-tight font-bold">
                Your Cart
              </h2>
            </div>

            {/* <!-- Products --> */}
            <div className="divide-y divide-green-600 border border-green-600 rounded-lg overflow-hidden">
              {/* <!-- Item --> */}
              {cartArray.map((productInCart) => {
                return (
                  <div
                    key={productInCart.id}
                    className="flex items-center justify-between gap-4 p-4 hover:bg-green-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={productInCart.images[0]}
                        width={500}
                        height={300}
                        alt={productInCart.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium text-green-600">
                          {productInCart.name}
                        </p>
                        <p className="text-sm text-green-400">
                          {productInCart.numberOfPlates}{' '}
                          {productInCart.name.toLowerCase()}s
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold text-green-700">
                      ${productInCart.price}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* <!-- Summary --> */}
            <div className="border border-green-600 rounded-lg p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Subtotal</span>
                <span className="font-semibold text-green-700">
                  ${subtotal}
                </span>
              </div>
              {/* <div className="flex justify-between text-sm">
                <span className='text-green-700'>Shipping</span>
                <span>$12</span>
              </div> */}
              <div className="flex justify-between text-sm">
                <span className="text-green-700">Tax</span>
                <span className="font-semibold text-green-700">${tax}</span>
              </div>
              <hr className="border-green-600" />
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-green-700">Total</span>
                <span className="font-semibold text-green-700">${total}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
