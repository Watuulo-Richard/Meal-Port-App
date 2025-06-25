import { prismaClient } from '@/prisma/db';
import {
  MutationCreateCategoryResponse,
  QueriesCategoriesResponse,
} from '@/types/types';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(3, 'Minimum Characters Should Be Three'),
  description: z.string().min(5, 'Minimum Characters Should Be Five'),
  images: z
    .array(z.string())
    .min(2, 'At least two images are required')
    .max(2, 'Maximum two images allowed'),
  slug: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<MutationCreateCategoryResponse>> {
  // const categoryData = await request.json()
  // console.log(categoryData, 'Data is Here');
  try {
    const categoryData = await request.json();
    console.log(categoryData);
    const validatedData = categorySchema.parse(categoryData);
    const createCategory = await prismaClient.category.create({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: createCategory,
      error: null,
      message: 'Category Has Been Saved Successfully',
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'Something Went Wrong',
        message: 'Failed To Create Category',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(
  request: NextRequest,
): Promise<NextResponse<QueriesCategoriesResponse>> {
  try {
    const getAllCategories = await prismaClient.category.findMany({
      orderBy: {
        name: 'desc',
      },
    });
    return NextResponse.json(
      {
        data: getAllCategories,
        message: 'Categories Haven Been Fetched Successfully',
        status: 200,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        data: [],
        message: 'Failed To Fetch Categories',
        status: 500,
      },
      {
        status: 500,
      },
    );
  }
}
