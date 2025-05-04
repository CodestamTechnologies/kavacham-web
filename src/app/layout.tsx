import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from "@/components/main/navbar";
import Footer from "@/components/main/footer";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: "Kavacham - Astrology That Shields",
  description:
    "Kavacham - Discover the power of ancient wisdom blended with modern insight. Kavacham is your personal astrological guide—crafted with precision, purpose, and protection.",
  keywords:
    "Kavacham, Codestam Technologies, AstroTalk ,Astrology,magic,zodic sign,cancer",
  authors: [{ name: "Kavacham", url: "https://www.kavachamtalks.in/" }],
  openGraph: {
    title: "Kavacham - Astrology That Shields",
    description:
      "Kavacham - Discover the power of ancient wisdom blended with modern insight. Kavacham is your personal astrological guide—crafted with precision, purpose, and protection.",
    url: "https://www.kavachamtalks.in/",
    siteName: "Kavacham",
    images: [
      {
        url: "/logo1.png",
        width: 1200,
        height: 630,
        alt: "Kavacham",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@souravvmishra",
    title: "Kavacham - Astrology That Shields",
    description:
      "Kavacham - Discover the power of ancient wisdom blended with modern insight. Kavacham is your personal astrological guide—crafted with precision, purpose, and protection.",
    images: ["/logo1.png"],
    creator: "@souravvmishra",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img45.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
