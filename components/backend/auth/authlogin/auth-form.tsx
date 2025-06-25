"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LockIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginTypes } from "@/schema/schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AuthForm() {
    const {register, handleSubmit, reset, formState:{errors}} = useForm<LoginTypes>({resolver: zodResolver(loginSchema)}) 
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    async function onSubmit(loginDetails: LoginTypes) {
        setIsLoading(true);
        try {
            /**
             * To update with your actual authentication logic
             */
            console.log("Signing in with credentials:", loginDetails);
            const response = await signIn('credentials', {
                ...loginDetails,
                redirect: false
            })
            console.log('SignIn Response:', response);
            if(response?.ok) {
                setIsLoading(false)
                toast.success('Login Successful')
                reset()
                router.push('/home-page')
            } else {
                setIsLoading(false)
                toast.error('Sign-in error: Please check your credentials')
            }
        } catch (error) {
            setIsLoading(false)
            console.error("Authentication error:", error);
            toast.error('Internet Connection Error...!!!, Please Check Your Internet Connection...!!!❌')
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
                <label
                    htmlFor="email"
                    className="text-sm font-medium text-black dark:text-white"
                >
                    Email
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center w-4 h-4">
                        @
                    </span>
                    <Input
                        {...register('email', {required: true})}
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        required
                        disabled={isLoading}
                        className="pl-10 h-12 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                        autoComplete="email"
                        />
                        {errors.email && <span className='text-xs text-red-600 capitalize'>Email is required</span>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-black dark:text-white">
                    Password
                </label>
                <div className="relative">
                    <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        {...register('password', {required: true})}
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        disabled={isLoading}
                        className="pl-10 h-12 bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
                    />
                    {errors.password && <span className='text-xs text-red-600 capitalize'>Password is required</span>}
                </div>
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 text-base font-medium bg-emerald-600 text-white hover:bg-emerald-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
}
