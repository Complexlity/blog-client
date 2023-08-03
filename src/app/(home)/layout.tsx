import Providers from "@/Contexts/Providers";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/Components/ui/toaster";
import { getPosts, getUser } from "@/lib/serverFunctions";

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
  const user = await getUser();
  const posts = await getPosts();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Providers user={user}>
        <body className={`${inter.className} overflow-x-hidden`}>
          {children}
        </body>
        <Toaster />
      </Providers>
    </html>
  );
}
