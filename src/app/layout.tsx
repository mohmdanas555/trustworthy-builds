import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: "Saud Shehatha Construction",
  description: "Building Your Dreams with Quality & Trust",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased">
        <DataProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </DataProvider>
      </body>
    </html>
  );
}
