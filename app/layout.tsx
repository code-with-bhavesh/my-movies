import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/app/client-provider";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import NavBar from "@/app/_components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie App",
  description: "Movie App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider session={session}>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
