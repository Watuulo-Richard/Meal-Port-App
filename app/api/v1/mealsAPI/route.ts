import { prismaClient } from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const mealAPISchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  price: z.coerce.number(),
  ingredients: z.array(z.string()),
  categoryId: z.string(),
});

export async function POST(request: NextRequest) {
  // const mealData = await request.json()
  // console.log(mealData);
  try {
    const mealData = await request.json();
    console.log(mealData);
    const validatedData = mealAPISchema.parse(mealData);
    const createMealData = await prismaClient.mealProduct.create({
      // data: {
      //     name: mealData.name,
      //     slug: mealData.slug,
      //     description: mealData.description,
      //     image: mealData.image,
      //     price: mealData.price,
      //     ingredients: mealData.ingredients,
      //     categoryId: mealData.categoryId
      // }
      data: validatedData,
    });
    return NextResponse.json(
      {
        data: createMealData,
        error: null,
        message: 'Meal Has Been Created Successfully',
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
        data: null,
        error:
          'Something Went Wrong, Try To Check Your Internet Connection...!!!',
        message: 'Failed To Create Meal',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(request: NextRequest) {
    try {
        const getAllMeals = await prismaClient.mealProduct.findMany({
            orderBy: {
                name: 'desc'
            }
        })
        return NextResponse.json({
            data: getAllMeals,
            error: null,
            message: 'Meals Fetched Successfully',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: 'Something Went Wrong, Try To Check Your Internet Connection...!!!',
            message: 'Failed To Fetch All The Meals...🥺',
            status: 500
        }, {
            status: 500
        })
    }
}
