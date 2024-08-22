import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CreateDish from "@/components/CreateDish";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookbook",
  description: "A collection of recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} text-primary/90`}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="h-screen container md:max-w-[80rem] ">

            {children}
          </main>
          <CreateDish />
        </Providers >
      </body>
    </html >
  );
}
