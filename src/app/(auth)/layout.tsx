import Providers from "@/Contexts/Providers";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { Toaster } from "@/Components/ui/toaster";
import { getUser } from "@/lib/serverFunctions";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers >
        <body className={`${inter.className} overflow-x-hidden`}>
          {children}
        </body>
        <Toaster />
      </Providers>
    </html>
  );
}
