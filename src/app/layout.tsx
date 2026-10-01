import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Qreative - Professional QR Code Generator",
  description: "Generate high-resolution PNG and SVG QR codes instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Meta Tag Verification */}
        <meta name="google-adsense-account" content="ca-pub-4259596276772805" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}