import { Maven_Pro } from "next/font/google";

import TextReveal from "@/utils/TextReveal";
import LeftSlide from "@/utils/LeftSlide";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const maven = Maven_Pro({ subsets: ["latin"], weight: ["700"] });

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      {/* Hero section component starts here */}
      <section className={`pt-32 ${maven.className}`}>
        <div className="max-w-lg mb-4">
          <TextReveal>
            <h1 className="text-6xl font-bold text-black">
              Welcome to Devtree.
            </h1>
          </TextReveal>
          <LeftSlide>
            <h2 className="text-2xl font-sans text-gray-500 mt-3">
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
    </main>
  );
}
