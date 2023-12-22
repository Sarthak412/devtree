import Image from "next/image";
import Link from "next/link";

import LogoLight from "../../public/";

import { Maven_Pro } from "next/font/google";

const maven = Maven_Pro({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
  return (
    <main>
      <header className="bg-white border-b border-gray-300 shadow p-4">
        <div className="flex items-center space-x-4">
          <Link
            href={"/"}
            className={`flex items-center gap-2 ${maven.className}`}
          >
            <Image src={LogoLight} alt="logo_light" width={40} height={40} />
            <span className="text-2xl font-bold text-black">Devtree</span>
          </Link>
        </div>
        <nav>
          <Link href={"/about"}>About</Link>
          <Link href={"/pricing"}>Pricing</Link>
          <Link href={"/contact"}>Contact</Link>
        </nav>
        <div>
          <Link href={"/login"}>Login</Link>
          <Link href={"/login"}>Create Account</Link>
        </div>
      </header>
    </main>
  );
}
