'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HiInformationCircle } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AlertCircleIcon, Loader, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { baseUrl } from '@/types/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const FormSchema = z.object({
  token: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
});

export default function VerifyTokenForm({
  userToken,
  id,
}: {
  userToken: number | undefined;
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const userInputToken = parseInt(data.token);
    if (userInputToken === userToken) {
      setShowNotification(false);
      // Here We Update The User
      try {
        const response = await fetch(`${baseUrl}/api/v1/signUpAPI/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        console.log(response);
        setLoading(false);
        toast.success('Account Verified Successfully');
        router.push('/logIn-page');
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error('Failed To Verify Account...!!!');
      }
    } else {
      setShowNotification(true);
      setLoading(false);
    }
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {showNotification && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Unable to verify your account.</AlertTitle>
            <AlertDescription>
              <p>Please verify your Account and try again.</p>
              <ul className="list-inside list-disc text-sm">
                <li>Check your email Account</li>
                {/* <li>Ensure sufficient funds</li>
                <li>Verify billing address</li> */}
              </ul>
            </AlertDescription>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Token Here</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-figure pass code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          loading ? (
            <Button type="submit">
              <Loader2 className='px-2 animate-spin'/>
              Verifying Account, Please Wait...</Button>
          ):(
            <Button type="submit">Submit</Button>
          )
        }
      </form>
    </Form>
  );
}
