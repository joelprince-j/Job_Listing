import type { Metadata, Viewport } from "next";
import { Inter, Nunito } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { brandName } from "@/config/site";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  title: { default: `${brandName} — Part-time jobs for students`, template: `%s | ${brandName}` },
  description: "Flexible part-time jobs for college students across the USA and UK.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf5ec",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} flex min-h-screen flex-col antialiased`}>
        <AuthProvider>
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </AuthProvider>
      </body>
    </html>
  );
}
