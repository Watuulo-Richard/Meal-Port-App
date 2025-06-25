import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { AuthForm } from './auth-form';
import { SocialLogin } from './social-login';

export default function AuthBasic() {
  return (
    <div className="flex min-h-screen items-center justify-center p-2 dark:bg-black">
      <div className="w-full max-w-[460px]">
        <div className="w-full flex justify-center items-center">
          <div className="w-36 h-36 relative mb-0">
            <Image
              src="/android-chrome-512x512.png"
              alt="To the moon illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <Card className="w-full border-0 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-neutral-600 dark:text-neutral-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <AuthForm />
            <SocialLogin />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
