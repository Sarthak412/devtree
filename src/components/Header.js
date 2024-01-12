import Image from "next/image";
import Link from "next/link";

import LogoLight from "../../public/Devtree_dark.png";

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
    <header className="bg-gradient-to-b from-black/60 to-purple-950/20 shadow py-6">
      <div className="max-w-4xl flex items-center justify-between mx-auto px-3">
        <div className="flex gap-8">
          <div className="flex items-center">
            <Link
              href={"/"}
              className={`flex items-center gap-2 ${maven.className}`}
            >
              <Image src={LogoLight} alt="logo_light" width={40} height={40} />
              <span className="text-2xl font-bold text-white">Devtree</span>
            </Link>
          </div>
          <nav className="hidden sm:inline-flex items-center gap-5 text-md mt-1 text-white">
            <Link href={"#about"} className="relative group overflow-hidden">
              About
              <span className="w-full h-[2px] inline-flex absolute bottom-0 left-0 bg-white -translate-x-[105%] group-hover:translate-x-0 duration-300"></span>
            </Link>
            <Link
              href={"#theme_section"}
              className="relative group overflow-hidden"
            >
              Themes
              <span className="w-full h-[2px] inline-flex absolute bottom-0 left-0 bg-white -translate-x-[105%] group-hover:translate-x-0 duration-300"></span>
            </Link>
          </nav>
        </div>

        <nav className="flex items-center gap-2">
          {session ? (
            <>
              <Link href={"/account"} className="flex">
                <div className="flex items-center gap-3 px-4">
                  <Image
                    src={session.user.image}
                    alt="profile_picture"
                    width={35}
                    height={35}
                    className="rounded-full xs:hidden sm:block md:block border-2 border-white"
                  />
                  <h1 className="text-white hidden md:flex md:items-center">
                    {session?.user?.name}
                  </h1>
                </div>
              </Link>
              <LogoutBtn />
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="bg-purple-900/20 border text-white px-2 py-2 md:px-3 md:py-2  hover:bg-purple-800/40"
              >
                Login
              </Link>
              <Link
                href={"/login"}
                className="bg-purple-800 border border-white text-white px-2 py-2 md:px-3 md:py-2"
              >
                Sign-up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
