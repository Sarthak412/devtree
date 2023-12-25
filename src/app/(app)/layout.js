import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen">
          <aside className="bg-purple-100 w-48 p-4">
            <div className="rounded-full overflow-hidden border-2 border-purple-700 aspect-square w-24 mx-auto">
              <Image
                src={session?.user?.image}
                alt="profile image"
                width={250}
                height={250}
              />
            </div>
            <nav className="flex flex-col text-center mt-8 gap-4">
              <Link href={"/account"}>Settings</Link>
              <Link href={"/analytics"}>Analytics</Link>
            </nav>
          </aside>
        </main>
        <div className="max-w-4xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
