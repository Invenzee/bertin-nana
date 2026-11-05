import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bertin Nana — How God Sees the World",
  description: "Explore How God Sees the World by Bertin Nana. A personal journey through Christian faith, mathematics, philosophy, and the mysteries of the universe. Discover the book in English and French.",
  openGraph: {
    title: "Bertin Nana — How God Sees the World",
    description: "Faith. Reason. A different perspective.",
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    images: [{ url: "/images/book-cover-fr.jpg", width: 1800, height: 2700, alt: "Comment Dieu voit le monde — Bertin Nana" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={poppins.variable} suppressHydrationWarning>{children}</body></html>;
}
