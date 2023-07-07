import { Inter } from "next/font/google";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "../../(home)/globals.css";
import Providers from "@/contexts/Providers";


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
  // const user = await getUser();
  const user = null;
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
      </Providers>
    </html>
  );
}
