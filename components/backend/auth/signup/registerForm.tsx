'use client';
import { Headset, Loader2, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CustomCarousel from './custom-carousel';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { baseUrl } from '@/types/types';
import SubmitButton from '../../submit-button';
import LoginTextInput from './loginTextInput';
// import { UserRole } from '@/lib/generated/prisma';
import { SignUpTypes } from '@/schema/schema';
import { UserRole } from '@prisma/client';
export default function RegisterForm({role='USER'}:{role?: UserRole}) {
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpTypes>();
  const router = useRouter();
  async function onSubmit(userDetails: SignUpTypes) {
    setLoading(true);
    userDetails.phone = `+256${userDetails.phone}`;
    userDetails.role = role;
    // data.image =
    //   'https://utfs.io/f/59b606d1-9148-4f50-ae1c-e9d02322e834-2558r.png';
    try {
      const response = await fetch(`${baseUrl}/api/v1/signUpAPI`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(userDetails)
      });
      if (response.status === 409) {
        setLoading(false);
        toast.error('Customer Email Address Already Exists In The System') 
      } else if (response.status === 201) {
        setLoading(false);
        toast.success('Account Created successfully', {
          description:'Your has been created, a code has been sent to your email please Verify',
        });
        const userCreatedUserDetails = await response.json();
        router.push(`/verify-page/${userCreatedUserDetails.data.id}`);
      } else {
        setLoading(false);
        console.log(response);
        toast.error('Something went wrong');
      }
    } catch (error) {
      setLoading(false);
      console.error('Network Error:', error);
      toast.error('Its seems something is wrong, try again');
    }
  }
  return (
    <div className="w-full lg:grid h-screen lg:min-h-[600px] lg:grid-cols-2 relative ">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid  gap-6 mt-10 md:mt-0">
          <div className="absolute left-1/3 top-14 md:top-5 md:left-5">
            {/* <Logo /> */}
          </div>
          <div className="grid gap-2 text-center mt-10 md:mt-0">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-muted-foreground text-sm">
              Create Your <span className="text-blue-600">MEAL-PORT</span>{' '}
              Account Today To Get Started
            </p>
          </div>
          <div className="">
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-4">
                <LoginTextInput
                  label= 'First Name'
                  register={register}
                  name='firstName'
                  errors={errors}
                  placeholder='Please Enter Your First Name'
                />
              </div>
              <div className="">
                <LoginTextInput
                  label= 'Last Name'
                  register={register}
                  name='lastName'
                  errors={errors}
                   placeholder='Please Enter Your Last Name'
                />
              </div>
              <div className="">
                <LoginTextInput
                  label= 'Phone Number'
                  register={register}
                  name='phone'
                  errors={errors}
                  placeholder='Please Enter Your Phone Number'
                />
              </div>
              <div className="">
                <LoginTextInput
                  label= 'Email'
                  register={register}
                  name='email'
                  errors={errors}
                  type='email'
                  placeholder='Please Enter Your Email'
                />
              </div>
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" {...register('password', {required: true})} placeholder="Please Enter Your Password" />
                {errors.lastName && <span className='text-xs text-red-600 capitalize'>Password is required</span>}
              </div>

              {/* <PasswordInput
                register={register}
                errors={errors}
                label="Password"
                name="password"
                icon={Lock}
                placeholder="password"
                type="password"
              /> */}
              {/* <div className="">
                {emailErr && (
                  <p className="text-red-500 text-xs mt-2">{emailErr}</p>
                )}
              </div> */}
              <div>
                <SubmitButton
                  title="Sign Up"
                  loadingTitle="Creating Account Please wait..."
                  loading={loading}
                  className="w-full"
                  loaderIcon={Loader2}
                  showIcon={false}
                />
              </div>
            </form>
            {/* <div className="flex items-center py-4 justify-center space-x-1 text-slate-900">
              <div className="h-[1px] w-full bg-slate-200"></div>
              <div className="uppercase">Or</div>
              <div className="h-[1px] w-full bg-slate-200"></div>
            </div> */}

            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Button
                onClick={() => signIn("google")}
                variant={"outline"}
                className="w-full"
              >
                <FaGoogle className="mr-2 w-6 h-6 text-red-500" />
                Login with Google
              </Button>
              <Button
                onClick={() => signIn("github")}
                variant={"outline"}
                className="w-full"
              >
                <FaGithub className="mr-2 w-6 h-6 text-slate-900 dark:text-white" />
                Login with Github
              </Button>
            </div> */}
            <p className="mt-6 text-sm text-gray-500">
              Already Registered ?{' '}
              <Link
                href="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <CustomCarousel />
      </div>
    </div>
  );
}
