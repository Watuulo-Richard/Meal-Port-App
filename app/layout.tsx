import type { Metadata } from 'next';
import { Delius } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import ReactQueryProvider from './providers/ReactQueryProvider';

const delius = Delius({
  variable: '--font-Delius',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Meal Port',
  description: 'Meal-Port Restaurant App is a powerful and user-friendly digital solution designed to transform how restaurants manage orders and how customers discover and enjoy meals. 🍽️📱 It offers a seamless experience for both restaurant owners and diners, combining convenience, efficiency, and modern design. Customers can browse a beautifully categorized digital menu featuring rich images, prices, and detailed descriptions of every dish. 🥘🍰 They can place orders directly from their phones — for dine-in, takeout, or delivery — without needing to wait for a waiter. Each meal includes allergen info, preparation time, ingredients, and customer ratings to help users make informed choices. Restaurants can easily manage their entire menu, update prices, mark items as out of stock, or feature new offers. The app includes a real-time order tracking system, letting customers know when their food is being prepared or delivered. 🛵💨 A built-in table reservation feature allows diners to book in advance with live availability updates. For payments, Meal-Port supports multiple options: mobile money, credit/debit cards, and cash-on-delivery. 💳📲 Admin dashboards help restaurant owners view analytics like top-selling dishes, peak hours, and customer feedback. Push notifications keep customers updated on deals, order status, and special events. Loyalty rewards and coupon codes help restaurants retain customers and drive repeat business. 🎉 The app supports multiple restaurant branches and allows customers to find the nearest one using GPS. It’s responsive and works smoothly across Android, iOS, and web platforms. Meal-Port also includes multilingual support to cater to a diverse user base. 🌍 With powerful search and filter options, users can easily find meals based on ingredients, diet (vegan, keto, etc.), or preferences. Reviews and ratings help build trust and guide new customers to try the best dishes. 🌟 Chefs and staff can receive real-time notifications for new orders and update statuses accordingly. The app also enables feedback collection to improve customer satisfaction. Meal-Port Restaurant App is the future of smart, efficient, and customer-first dining experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${delius.variable} ${delius.variable} antialiased bg-[#EEE9DB]`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster richColors position='bottom-right'/>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
