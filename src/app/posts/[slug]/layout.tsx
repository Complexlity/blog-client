import Footer from "@/Components/Footer";
import Navbar from "@/Components/NavBar";
import { Toaster } from "@/Components/ui/toaster";
import Providers from "@/Contexts/Providers";
import { getSinglePost, getUser } from "@/lib/serverFunctions";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";


const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers>
        <body className={inter.className}>
          <div>
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
        <Toaster />
        <Analytics />
      </Providers>
    </html>
  );
}
