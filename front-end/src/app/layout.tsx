import type { Metadata } from "next";
import { Montserrat, Comic_Neue } from "next/font/google";
import "./index.scss";
import Header from "@/components/Header";
import { useRouter } from "next/router";

// let font: NextFont;
// if(Math.random() * 1000 <= 1) font = Comic_Neue({ subsets: ["latin"], weight: "400" });
// else font = Montserrat({ subsets: ["latin", "cyrillic"], weight: "400" });

const font = Montserrat({ subsets: ["latin", "cyrillic"], weight: "400" });

export const metadata: Metadata = {
  title: "KPI Schedule",
  icons: "/icon.jpg",
  description: "Site for KPI Schedule",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
