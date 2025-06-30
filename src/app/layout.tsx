import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ClientTracker from "@/lib/tracking/ClientTracker"; // ✅ import here

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zain’s Gaming Hub 🎮",
  description: "Zain's epic gaming universe",
};
  openGraph: {
    title: "Zain Shah — Developer",
    description: "Explore my design + dev projects, all in one place.",
    url: "https://zain-main-web.vercel.app/",
    siteName: "Zain Shah",
    images: [
      {
        url: "/photoshared.jpg",
        width: 1200,
        height: 630,
        alt: "Zain Shah",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zain Shah",
    description: "Creative Developer & Designer",
    images: ["/photoshared.jpg"],
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QDN392RS4B"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QDN392RS4B');
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <ClientTracker /> {/* ✅ tracking component rendered here */}
      </body>
    </html>
  );
}
