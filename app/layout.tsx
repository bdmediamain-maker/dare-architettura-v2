import type { Metadata } from "next";
import { Inter } from "next/font/google";
import PageLoader from "@/components/loader/PageLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | dare-architettura",
    default: "dare-architettura — Studio di Architettura Ferrara"
  },
  description: "Studio di architettura basato sul binomio osare-dare. Ferrara, dal 2009.",
  openGraph: {
    siteName: "dare-architettura",
    locale: "it_IT",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable}>
      <body className={inter.className}>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
