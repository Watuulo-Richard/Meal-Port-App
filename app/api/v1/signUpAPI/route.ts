"use server";
 
import { prismaClient } from "@/prisma/db";
import { SignUpTypes } from "@/schema/schema";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt-ts";
import { Resend } from "resend";
import EmailTemplate from "@/components/emails/email-template";
export async function POST(request:NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const userDetails:SignUpTypes = await request.json()
  const { firstName, lastName, email, password, phone, role } = userDetails;
  try {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json({
        data: null,
        error: `User with this email ( ${email})  already exists in the Database`,
        status: 409,
      }, {
        status: 409
      });
    }
    // Encrypt the Password =>bcrypt
    const hashedPassword = await hash(password, 10);
    //Generate Token
    const generateToken = () => {
      const min = 100000; // Minimum 6-figure number
      const max = 999999; // Maximum 6-figure number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();
    const newUser = await prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        role,
        token: userToken,
      },
    });
    //Send an Email with the Token on the link as a search param
    const token = newUser.token as number;
    const userId = newUser.id;
    console.log(userId);
    // const firstName = newUser.name.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Meal-Port Restaurant. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "Meal-Port App <info@lubegajovan.com>",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({ firstName, lastName, token, linkText, message }),
    });
    console.log(token);
    console.log(sendMail);
    console.log(newUser);
    return NextResponse.json({
      data: newUser,
      error: null,
      message: 'Customer Created Successfully In The DataBase...✅',
      status: 201,
    }, {
      status: 201,  
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
        data: null,
        error: "Something Went Wrong, Please Check Your Internet Connection...!!!❌",
        message: 'Internet Connection Error...!!!, Please Check Your Internet Connection...!!!❌',
        status: 500
    }, {
        status: 500
    });
  }
}