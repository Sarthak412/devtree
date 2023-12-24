import Image from "next/image";
import Link from "next/link";

import LogoLight from "../../public/Devtree_light.png";

// Constants
import { links } from "@/constants";

// Fonts
import { Maven_Pro } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutBtn from "./buttons/LogoutBtn";
const maven = Maven_Pro({ subsets: ["latin"], weight: ["700"] });

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="bg-white border-b border-gray-300 shadow py-4">
      <div className="max-w-4xl flex justify-between mx-auto px-6">
        <div className="flex gap-5">
          <div className="flex items-center space-x-4">
            <Link
              href={"/"}
              className={`flex items-center gap-2 ${maven.className}`}
            >
              <Image src={LogoLight} alt="logo_light" width={40} height={40} />
              <span className="text-2xl font-bold text-black">Devtree</span>
            </Link>
          </div>
        </div>
        <nav className="hidden md:inline-flex items-center gap-6 text-md mt-1 text-black">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.title}
              className="relative group overflow-hidden"
            >
              {link.title}
              <span className="w-full h-[2px] inline-flex absolute bottom-0 left-0 bg-black -translate-x-[105%] group-hover:translate-x-0 duration-300"></span>
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href={"/login"}
                className="bg-black text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href={"/login"}
                className="text-white bg-purple-800 border border-gray-300 px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <Link href={"/account"} className="flex gap-5">
                <div className="flex items-center gap-3 px-4">
                  <Image
                    src={session.user.image}
                    alt="profile_picture"
                    width={35}
                    height={35}
                    className="rounded-full border border-purple-500"
                  />
                  <h1 className="text-gray-500 hidden md:flex md:items-center">
                    {session?.user?.name}
                  </h1>
                </div>
              </Link>
              <LogoutBtn />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
