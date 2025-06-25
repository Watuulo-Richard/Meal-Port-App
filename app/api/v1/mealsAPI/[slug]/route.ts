import { prismaClient } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for Meal Validation
const mealAPISchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  image: z.array(z.string()),
  price: z.coerce.number(),
  ingredients: z.array(z.string()),
  categoryId: z.string(),
});

export async function GET(request: NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const {slug} = await params
        const getSingleMeal = await prismaClient.mealProduct.findUnique({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: getSingleMeal,
            message: 'Single Meal Fetched Successfully',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: 'Failed To Fetch Single Meal...🥺',
            error: 'Something Went Wrong...!!!',
            status: 500
        }, {
            status: 500
        })
    }
}

export async function DELETE(request: NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const {slug} = await params
        const deleteMeal = await prismaClient.mealProduct.delete({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: deleteMeal,
            message: 'Meal Deleted Successfully',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: 'Failed To Delete Meal Category...🥺',
            error: 'Something Went Wrong...!!!',
            status: 500
        }, {
            status: 500
        })
    }
}

export async function PATCH(request: NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const {slug} = await params
        const mealData = await request.json()
        // const validatedData = mealAPISchema.parse(mealData)
        const updateMeal = await prismaClient.mealProduct.update({
            where: {
                slug: slug
            },
            data: mealData,
        })
        return NextResponse.json({
            data: updateMeal,
            message: 'Meal Category Updated Successfully',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: 'Failed To Update Meal...🥺',
            error: 'Something Went Wrong...!!!',
            status: 500
        }, {
            status: 500
        })
    }
}