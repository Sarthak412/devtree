import { Inter } from "next/font/google";
import "../globals.css";
import NavbarTransition from "@/utils/HeaderTransition";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className}`}>
        <main>
          <NavbarTransition>
            <Header />
          </NavbarTransition>
        </main>
        <div className="max-w-4xl mx-auto p-6">{children}</div>
        <footer className="w-full py-5 bg-black/50 flex items-center justify-center text-center">
          <div>
            <h1 className="text-gray-300/95 text-xl">
              &copy; 2024 Devtree. All rights reserved.
            </h1>
          </div>
        </footer>
      </body>
    </html>
  );
}
