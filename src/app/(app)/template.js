import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";

import "../globals.css";

import LogoutBtn from "@/components/buttons/LogoutBtn";

import AppSidebar from "@/components/layout/AppSidebar";
import { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faLink } from "@fortawesome/free-solid-svg-icons";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import Link from "next/link";

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

  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  return (
    <html lang="en">
      <body className={`${inter.className} md:flex`}>
        <Toaster
          position="top-center"
          reverseOrder={false}
          // Themed Toast Notification from 'react-hot-toast'
          toastOptions={{
            className: "",
            style: {
              border: "2px solid slateblue",
              padding: "8px",
              paddingInline: "1.5rem",
              color: "white",
              background: "rgba(0, 0, 0, 0.8)",
            },
            iconTheme: {
              primary: "slateblue",
              secondary: "white",
            },
          }}
        />
        <main className="md:flex md:min-h-screen">
          <label
            htmlFor="navCb"
            className="md:hidden ml-8 mt-6 bg-white px-5 py-3 shadow rounded-md inline-flex items-center gap-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBars} />
            <span>Dashboard</span>
          </label>
          <input type="checkbox" id="navCb" className="hidden" />
          <label
            htmlFor="navCb"
            className="hidden backdrop fixed inset-0 bg-black/80 z-10"
          ></label>
          <aside className="bg-white border-r shadow md:translate-x-0 shadow-gray-300 w-50 p-10 flex flex-col pt-8 fixed md:static -left-56 top-0 bottom-0 z-20 transition-all duration-200">
            <div className="sticky top-0 pt-2">
              <div className="flex items-center justify-center rounded-full overflow-hidden border-[4px] border-gray-200 shadow-md shadow-gray-400 aspect-square w-28 mx-auto">
                <Image
                  src={session?.user?.image}
                  alt="profile image"
                  width={250}
                  height={250}
                  className="aspect-square"
                />
              </div>
              {page && (
                <Link
                  target="_blank"
                  href={`/${page.uri}`}
                  className="text-center mt-5 flex items-center justify-center gap-1"
                >
                  <FontAwesomeIcon
                    icon={faLink}
                    className="text-purple-500 h-5"
                    size="lg"
                  />
                  <span className="text-gray-300 text-xl">/</span>
                  <span className="text-gray-500 text-xl">{page.uri}</span>
                </Link>
              )}
              <div className="text-center flex-grow flex flex-col mx-auto">
                <AppSidebar />
                <div className="text-center flex items-center justify-center border-t border-gray-200 mt-5 mb-5 pt-4">
                  <LogoutBtn
                    iconLeft={true}
                    className="flex mt-2 gap-5 px-5 py-2.5 text-white bg-black rounded-md items-center hover:bg-purple-800 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </aside>
        </main>
        <div className="grow">{children}</div>
      </body>
    </html>
  );
}
