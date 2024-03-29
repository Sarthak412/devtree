import { ModeToggle } from "@/components/buttons/DarkModeToggle";

import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import {
  faDiscord,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
  faImage,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

import { btoa } from "next/dist/compiled/@edge-runtime/primitives";

export const icons = {
  email: faEnvelope,
  linkedin: faLinkedin,
  github: faGithub,
  x: faXTwitter,
  instagram: faInstagram,
  youtube: faYoutube,
  discord: faDiscord,
};

function socialBtnLink(key, value) {
  if (key === "email") {
    return `mailto:${value}`;
  }
  if (key === "linkedin") {
    return value;
  }
  if (key === "github") {
    return value;
  }
  if (key === "x") {
    return value;
  }
  if (key === "instagram") {
    return value;
  }
  if (key === "youtube") {
    return value;
  }
  if (key === "discord") {
    return value;
  }
}

export default async function DevtreePage({ params }) {
  const uri = params.uri;

  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ uri: uri });

  // Handling the case if a page is not found
  if (!page) {
    return <div> Page not found </div>;
  }

  const user = await User.findOne({ email: page.owner });

  // Handling the case if a user is not found
  if (!user) {
    return <div> User not found </div>;
  }

  // This creates a new Event collection in the DB which will be used to create the analytics page
  await Event.create({ uri: uri, page: page.uri, type: "view" });

  return (
    <div className="bg-white/90 min-h-screen dark:bg-black/95">
      <div
        className="h-36 bg-gray-300 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.color }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      >
        <div className="flex justify-end px-5 py-4">
          {/* Component for toggling Dark Mode */}
          <ModeToggle />
        </div>
      </div>
      <div className="aspect-square w-36 h-36 mx-auto relative -top-16 -mb-11">
        <Image
          className="rounded-full w-full h-full border-4 shadow border-gray-200 object-cover"
          src={user.image}
          alt="avatar"
          width={190}
          height={190}
        />
      </div>
      <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-gray-100">
        {page.displayName}
      </h2>
      <h2 className="text-lg flex gap-2 items-center justify-center text-gray-900 font-semibold dark:text-purple-500">
        <FontAwesomeIcon icon={faLocationDot} className="h-5 text-red-600" />
        <span>{page.location}</span>
      </h2>
      <div className="max-w-sm mx-auto text-center p-2 my-2">
        <h2 className="">{page.bio}</h2>
      </div>
      <div className="flex gap-2 justify-center mt-4 pb-4">
        {Object.keys(page.socialLinks).map((socialLink) => (
          <Link
            key={socialLink}
            href={socialBtnLink(socialLink, page.socialLinks[socialLink])}
            target="_blank"
            className="rounded-full border-2 border-black p-2 hover:bg-gradient-to-br hover:from-purple-200 hover:to-red-200 dark:border-white hover:dark:bg-gradient-to-br hover:dark:from-purple-600 hover:dark:to-red-400/25"
          >
            <FontAwesomeIcon className="w-5 h-5" icon={icons[socialLink]} />
          </Link>
        ))}
      </div>
      {/* Project Links */}
      <div className="max-w-6xl mx-auto p-4 px-8">
        {page.projectLinks.map((link) => (
          <div
            key={link.key}
            className="text-black p-2 mb-4 block border-2 border-gray-900 dark:border-gray-300 py-4 rounded dark:text-gray-200 shadow-neurobrutalism_black flex items-center gap-5 backdrop-filter backdrop-blur-md bg-opacity-20 transition-all duration-300 hover:bg-gradient-to-br hover:from-pink-200/20 hover:to-purple-500/60 hover:dark:bg-gradient-to-br hover:dark:from-purple-500/20 hover:dark:to-purple-800/5 hover:dark:border-purple-700"
          >
            {link.icon && (
              <div className="w-1/4 md:w-1/5 md:border-2 md:border-gray-800 relative -left-6 border hidden dark:md:border-gray-300 py-2 px-2 md:block">
                <Image
                  src={link.icon}
                  alt={"project logo"}
                  width={250}
                  height={250}
                  objectFit="cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* If icon is not present it loads a default icon */}
            {!link.icon && (
              <div className="hidden w-1/2 md:w-1/5 relative sm:flex items-center justify-center bg-black/40 border-black text-white dark:bg-purple-400/40 border-2 py-5 -left-6">
                <FontAwesomeIcon icon={faImage} className="h-20" />
              </div>
            )}

            <div className="flex flex-col w-full md:w-3/4 px-4">
              <div>
                <h3 className="text-2xl text-black dark:text-white font-semibold py-1">
                  {link.projectTitle}
                </h3>
                <p className="mb-1 text-gray-800 dark:text-gray-200">
                  {link.description}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-black dark:text-white">
                    Technologies:
                  </span>{" "}
                  {link.technologies}
                </p>
              </div>
              <div className="mt-4 flex gap-4">
                {link.liveLink && (
                  <Link
                    href={link.liveLink}
                    target="_blank"
                    ping={
                      process.env.URL +
                      "api/click?url=" +
                      btoa(link.liveLink) +
                      "&page=" +
                      page.uri
                    }
                    className="bg-black border border-purple-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:scale-95 shadow-neurobrutalism hover:shadow-none"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      className="h-4"
                    />
                    <span>Live Link</span>
                  </Link>
                )}
                {link.githubLink && (
                  <Link
                    href={link.githubLink}
                    target="_blank"
                    ping={
                      process.env.URL +
                      "api/click?url=" +
                      btoa(link.githubLink) +
                      "&page=" +
                      page.uri
                    }
                    className="bg-black border border-red-400 text-white px-4 py-2 rounded-md flex gap-2 hover:scale-95 shadow-neurobrutalism_two hover:shadow-none"
                  >
                    <FontAwesomeIcon icon={faGithub} className="h-5" />
                    <span>GitHub</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
