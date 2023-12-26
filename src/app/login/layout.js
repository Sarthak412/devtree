import Header from "@/components/Header";
import "../globals.css";

import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>
          <Header />
          <div className="max-w-4xl mx-auto p-6">{children}</div>
        </main>
      </body>
    </html>
  );
}
