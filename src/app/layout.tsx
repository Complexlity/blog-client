import Providers from "@/contexts/Providers";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
// import { getUser } from "@/lib/serverFunctions";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getUser();
  const user = null
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers user={user}>
        <body className={inter.className}>

          {children}
        </body>
        <Toaster />
      </Providers>
    </html>
  );
}
