import { Toaster } from "@/Components/ui/toaster";
import Providers from "@/Contexts/Providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Home | Complexlity Blog",
  description: "Write you own story for free on our blog",
};

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
