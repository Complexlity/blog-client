import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/contexts/Providers";
import { getUser } from "@/lib/serverFunctions";
import { Inter } from "next/font/google";
import "@/styles/globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Single Post Page",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser()
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers user={user}>
        <body className={inter.className}>
          <div>
            <Navbar />
            {children}
            <Footer />
          </div>
        </body>
        <Toaster />
      </Providers>
    </html>
  );
}
