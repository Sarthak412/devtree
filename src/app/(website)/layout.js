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
    <html lang="en">
      <body className={inter.className}>
        <main>
          <NavbarTransition>
            <Header />
          </NavbarTransition>
        </main>
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
