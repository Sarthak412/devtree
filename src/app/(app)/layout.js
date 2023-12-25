import { Inter } from "next/font/google";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faChartLine,
  faFileLines,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import LogoutBtn from "@/components/buttons/LogoutBtn";

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
              <nav className="mt-12 space-y-5 text-gray-700">
                <Link href={"/"} className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faFileLines}
                    fixedWidth={true}
                    className={"w-6 h-6"}
                  />
                  <span className="text-gray-600">My Page</span>
                </Link>
                <Link href={"/analytics"} className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    fixedWidth={true}
                    className={"w-6 h-6"}
                  />
                  <span>Analytics</span>
                </Link>
                <Link href={"/"} className="flex gap-4">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    fixedWidth={true}
                    className={"w-6 h-6"}
                  />
                  <span className="text-gray-600">Back to Home</span>
                </Link>
              </nav>
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
