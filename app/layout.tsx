import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bertin Nana — How God Sees the World",
  description: "Explore How God Sees the World by Bertin Nana, a book about Christian faith, mathematics, and the mysteries of the universe.",
  openGraph: {
    title: "Bertin Nana — How God Sees the World",
    description: "Faith. Reason. A different perspective.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/figma/book-cover.webp", width: 1365, height: 2048, alt: "How God Sees the World — Bertin Nana" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
