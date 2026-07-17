import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import AuthGuard from "@/component/auth-guard";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guarantor",
  description: "Make your deals with absolute confidence...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthGuard>{children}</AuthGuard>
        <Toaster />
      </body>
    </html>
  );
}
