'use client';
// import { ThemeToggle } from "./theme-toggle"
// import { Notifications } from "./notifications"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/contexts/settings-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Notifications } from './notification';
import { ShoppingCart } from 'lucide-react';
import CheckoutInteraction from './checkoutCart';
import { Badge } from './ui/badge';
import { useCartState } from '@/store/store';
import { Session } from 'next-auth';

export function TopNav({ session }: { session: Session }) {
  console.log(session);
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);
  const { settings } = useSettings();
  const { cartArray } = useCartState();
  const name = `${session.user.firstName} ${session.user.lastName}`;

  return (
    <header className="sticky top-0 z-40 border-b border-green-300 bg-[#EEE9DB]">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="hidden md:block">
          <nav className="flex items-center space-x-2">
            <Link href="/" className="text-sm font-medium">
              Meals
            </Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="text-sm font-medium"
                >
                  {segment.charAt(0).toUpperCase() + segment.slice(1)}
                </Link>
              </React.Fragment>
            ))}
          </nav>
        </div>
        <div className="flex items-center ml-60 sm:ml-0 gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {/* <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" /> */}
                <Badge
                  className="absolute -top-1 -right-4 h-2 min-w-2 rounded-full p-2 font-mono tabular-nums text-xs"
                  variant="destructive"
                >
                  {cartArray.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full p-4" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <CheckoutInteraction />
              {/* <DropdownMenuItem asChild>
                <Link href="/settings">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <Notifications />
          {/* <ThemeToggle /> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image} alt={name} />
                  <AvatarFallback>
                    {name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {session.user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">Profile</Link>
              </DropdownMenuItem>
              {session.user.role === 'ADMIN' && (
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
