import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../(home)/globals.css";
import Providers from "@/contexts/Providers";
import { Toaster } from "@/components/ui/toaster";
import { getPosts, getUser } from "@/lib/serverFunctions";

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
  const user = await getUser();
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
