import { Maven_Pro } from "next/font/google";

import Header from "@/components/Header";
import TextReveal from "@/utils/TextReveal";
import LeftSlide from "@/utils/LeftSlide";
import NavbarTransition from "@/utils/HeaderTransition";

const maven = Maven_Pro({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
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
        <form className="inline-flex border rounded bg-white items-center shadow">
          <span className="bg-white text-black py-2 pl-2">devtree.to/</span>
          <input
            className="py-2 border-none outline-none bg-white text-gray-500"
            type="text"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white rounded-r-md px-4 py-2 hover:bg-purple-600"
          >
            Join for free
          </button>
        </form>
      </section>
    </main>
  );
}
