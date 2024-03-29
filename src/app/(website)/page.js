import { Maven_Pro } from "next/font/google";

import TextReveal from "@/utils/TextReveal";
import LeftSlide from "@/utils/LeftSlide";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import NavbarTransition from "@/utils/HeaderTransition";
import About from "@/components/About";
import Themes from "@/components/Themes";

const maven = Maven_Pro({ subsets: ["latin"], weight: ["700"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <main className="py-7">
        {/* Hero section component starts here */}
        <section className={`pt-24 ${maven.className} px-2 md:px-4`}>
          <div className="max-w-lg mb-4">
            <TextReveal>
              <h1 className="text-6xl font-bold text-white">
                Welcome to{" "}
                <span className="text-transparent bg-gradient-to-br from-purple-300 to-purple-500 bg-clip-text">
                  Devtree.
                </span>
              </h1>
            </TextReveal>
            <LeftSlide>
              <h2 className="text-2xl font-sans text-purple-100 mt-2 font-normal">
                Curate your journey in one place. Showcase your projects
                effortlessly with personalized links.
              </h2>
            </LeftSlide>
          </div>
          {/* Add animations later after creating a separate component for Hero form  */}
          <LeftSlide>
            <HeroForm user={session?.user} />
          </LeftSlide>
        </section>

        <NavbarTransition>
          <div className="flex items-center justify-center mt-24 sm:mt-52">
            <Link href="#about">
              <FontAwesomeIcon
                icon={faAngleDoubleDown}
                className="animate-bounce text-white h-6"
              />
            </Link>
          </div>
        </NavbarTransition>

        {/* About Section  */}
        <section
          id="about"
          className="flex items-center justify-center w-full mt-12 relative"
        >
          <About />
        </section>

        {/* Themes Section */}
        <section id="theme_section" className=" mt-14">
          <Themes />
        </section>
      </main>
    </>
  );
}
