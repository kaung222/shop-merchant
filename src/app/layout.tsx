import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/store/providers/ReactQueryProvider";
import ReduxProvider from "@/store/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Shop Merchant",
  description: "Created by James",
  category: "ecomerce",
  authors: [{ name: "james", url: "https://google.com" }],
  // icons: "../../public/shoplogo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <div className="">{children}</div>
            <Toaster />
          </ReactQueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
