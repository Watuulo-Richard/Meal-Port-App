import Sidebar from "@/components/backend/sidebar";
import TopNav from "@/components/backend/top-nav";
import { authOptions } from "@/config/authoptions";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Meal-Port-App",
  description: "Generated by create next app",
};

export default async function BackendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    console.log('this is the not session part');
    redirect('/logIn-page')
  } else if (session.user.role !== 'ADMIN') {
    console.log('this is the else if part');
    redirect('/logIn-page')
  }
  
  return (
   <div className='flex h-screen'>
      <Sidebar />
      <div className="w-full flex flex-1 flex-col">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23]">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-white dark:bg-[#0F0F12]">{children}</main>
      </div>
    </div>
  );
}
