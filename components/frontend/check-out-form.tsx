'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Star,
  Package,
  Tag,
  DollarSign,
  Image,
  Plus,
  X,
  Sparkles,
  Loader2,
} from 'lucide-react';
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

export default function OrderForm({session}:{session:Session | null}) {
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
      userId: orderData.userId
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
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Product Creator
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Create beautiful product listings with professional validation
          </p>
        </div>

        <div className="grid max-w-2xl mx-auto gap-8">
          {/* Form Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 py-3 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 ">
                <Sparkles className="h-5 w-5" />
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
                  <Label className="text-gray-700 font-semibold">
                    First Name
                  </Label>
                  <Input
                    placeholder="Enter first name..."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                  <Label className="text-gray-700 font-semibold">
                    Last Name
                  </Label>

                  <Input
                    placeholder="Enter your last name..."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                  <Label className="text-gray-700 font-semibold">
                    Email Address
                  </Label>

                  <Input
                    placeholder="Enter your email address..."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      Email Address Is Required...
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-gray-700 font-semibold">Phone</Label>
                  <Input
                    placeholder="Enter your phone number..."
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Loader2 className="mr-2 h-4 w-4 text-blue-600 animate-spin" />
                      Making An Order, Please Wait...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Make An Order
                    </Button>
                  )}

                  {/* <Button
                    type="button"
                    onClick={onCancel}
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Cancel
                  </Button> */}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
