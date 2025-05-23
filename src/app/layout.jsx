// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import Header from "@/global-components/header/Header";
import Footer from '@/global-components/footer/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ZM Rentals",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning style={{backgroundColor: '#FFFFFF'}} >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
