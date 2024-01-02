import { Inter } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
