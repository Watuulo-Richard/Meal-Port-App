import { prismaClient } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for Category Validation
const categorySchema = z.object({
    name: z.string().min(3, 'Minimum Characters Should Be Three'),
    description: z.string().min(5, 'Minimum Characters Should Be Five'),
    image: z.array(z.string())
        .min(2, 'At least two images are required')
        .max(2, 'Maximum two images allowed'),
    slug: z.string()
});
export async function GET(request: NextRequest, {params}:{params:Promise<{slug:string}>}) {
    try {
        const {slug} = await params
        const getSingleCategory = await prismaClient.category.findUnique({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: getSingleCategory,
            message: 'Single Meal Category Fetched Successfully',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: 'Failed To Fetch Single Meal Category',
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
        const deleteCategory = await prismaClient.category.delete({
            where: {
                slug: slug
            }
        })
        return NextResponse.json({
            data: deleteCategory,
            message: 'Meal Category Deleted Successfully',
            error: null,
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            message: 'Failed To Delete Meal Category',
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
        const validatedData = categorySchema.parse(mealData)
        const updateCategory = await prismaClient.category.update({
            where: {
                slug: slug
            },
            data: validatedData,
        })
        return NextResponse.json({
            data: updateCategory,
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
            message: 'Failed To Update Meal Category',
            error: 'Something Went Wrong...!!!',
            status: 500
        }, {
            status: 500
        })
    }
}