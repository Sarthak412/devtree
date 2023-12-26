import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

import LogoutBtn from "@/components/buttons/LogoutBtn";

import AppSidebar from "@/components/layout/AppSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Devtree",
  description: "Showcase your projects",
};

export default async function AppTemplate({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <main className="flex min-h-screen">
          <aside className="bg-white border-r shadow shadow-gray-300 w-56 p-4 flex flex-col">
            <div className="rounded-full overflow-hidden border-2 border-black mt-8 aspect-square w-28 mx-auto">
              <Image
                src={session?.user?.image}
                alt="profile image"
                width={250}
                height={250}
              />
            </div>
            <div className="text-center flex-grow flex flex-col mx-auto">
              {/* Navigation Links (My Page, Analytics) at the top */}
              <AppSidebar />
              {/* Spacer to push items to the bottom */}
              <div className="flex-grow" />
              {/* Logout button at the bottom */}
              <div className="text-center flex items-center justify-center mb-5 pt-4">
                <LogoutBtn
                  iconLeft={true}
                  className="flex gap-5 px-5 py-2.5 text-white bg-black rounded-md items-center hover:bg-purple-800 transition-all duration-300"
                />
              </div>
            </div>
          </aside>
        </main>
        <div className="grow">
          <div className="bg-white m-8 p-4 shadow">{children}</div>
        </div>
      </body>
    </html>
  );
}
