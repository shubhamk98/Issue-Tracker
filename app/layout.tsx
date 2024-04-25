import type { Metadata } from "next";
import "./globals.css";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track all your issue at one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="light" accentColor="violet">
          <NavBar />
          <main className=" px-4 md:px-8">{children}</main>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
