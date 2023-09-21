"use client";

import { Montserrat } from "next/font/google";
import Head from "next/head";
import "./index.scss";
import Header from "@/components/Header";
import { createContext } from "react";

const inter = Montserrat({ subsets: ["latin", "cyrillic"], weight: "400" });
const LoginContext = createContext("");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginContext.Provider value="">
      <html lang="en">
        <Head>
          <link rel="icon" type="image/jpg" href="/icon.jpg" />
          <meta name="title" content="KPI Schedule" />
          <meta name="description" content="Site for KPI Schedule" />
        </Head>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </LoginContext.Provider>
  );
}
