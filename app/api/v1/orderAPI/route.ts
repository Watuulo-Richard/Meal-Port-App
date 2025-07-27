import { prismaClient } from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const orderDetails = await request.json();
    const createOrder = await prismaClient.order.create({
      data: {
        firstName: orderDetails.firstName,
        lastName: orderDetails.lastName,
        email: orderDetails.email,
        phone: orderDetails.phone,
      },
    });
    console.log(createOrder, 'the order');
    // Here Am getting access to the order items array
    for (const orderItem of orderDetails.orderItems) {
      // Here After Having Access To One Item, I send One By One To The DB
      const createOrderItemsInDB = await prismaClient.orderItem.create({
        data: {
          //                     name:              string;
          //   slug:              string;
          //   images:            string[];
          //   price:             number;
          //   numberOfPlates:    number;
          //   categoryId:        string;

          orderId: createOrder.id,
          mealId: orderItem.slug,
          mealName: orderItem.name,
          mealPrice: orderItem.price,
          mealImage: orderItem.images,
          quantity: orderItem.numberOfPlates,
          unitPrice: orderItem.unitPrice,
          totalPrice: orderItem.totalPrice,
        },
      });
      console.log(createOrderItemsInDB, 'the items to be sent in the DB');
    }
    return NextResponse.json(
      {
        message: 'Order Saved Successfully...✅',
        data: createOrder,
        status: 201,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Failed To Save Order...!!!',
        error:
          'Something Went Wrong, Try To Check Your Internet Connection...!!!',
        data: null,
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
