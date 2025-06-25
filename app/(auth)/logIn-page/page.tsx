import React from 'react';
import { cn } from '@/lib/utils';
import AuthBasic from '@/components/backend/auth/authlogin/auth-basic';

export default function page() {
  return (
    <>
      <div className="relative w-full items-center justify-center dark:bg-black">
        {/* Background Image Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/4.jpg')", // Replace with your image path
          }}
        />
        
        {/* Dark Green Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        {/* Original dot pattern (now on top of green overlay) */}
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
            "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
            "opacity-15" // Make dots more subtle
          )}
        />
        
        {/* Radial gradient for the container to give a faded look */}
        {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black opacity-50"></div> */}
        
        <div className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
          <AuthBasic />
        </div>
      </div>
    </>
  );
}