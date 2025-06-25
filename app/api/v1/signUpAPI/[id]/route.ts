import { prismaClient } from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const {id} = await params
        const getSingleUser = await prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json({
            data: getSingleUser,
            error: null,
            message: 'User Fetched Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: 'Something Went Wrong, Please Check Your Internet Connection...!!!❌',
            message: 'Failed To Fetch User...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}

export async function PATCH(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    try {
        const userDetails = await request.json()
        const {id} = await params
        const updateUser = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                isVerified : true
            }
        })
        return NextResponse.json({
            data: updateUser,
            error: null,
            message: 'Updated User Successfully...!!!✅',
            status: 200
        }, {
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            data: null,
            error: 'Something Went Wrong, Please Check Your Internet Connection...!!!❌',
            message: 'Failed To Update User...!!!🥺',
            status: 500
        }, {
            status: 500
        })
    }
}