import { ModeToggle } from "@/components/buttons/DarkModeToggle";
import { socialButtons } from "@/constants";
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
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";

export const icons = {
  email: faEnvelope,
  linkedin: faLinkedin,
  github: faGithub,
  x: faXTwitter,
  instagram: faInstagram,
  youtube: faYoutube,
  discord: faDiscord,
};

export default async function DevtreePage({ params }) {
  const uri = params.uri;

  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ uri: uri });

  const user = await User.findOne({ email: page.owner });

  console.log(page);

  return (
    <div className="bg-white dark:bg-black/95">
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
      <div className="flex gap-2 justify-center pb-4">
        {Object.keys(page.socialLinks).map((socialLink) => (
          <Link
            key={socialLink}
            href={"/"}
            className="rounded-full border-2 border-black p-2 dark:border-white"
          >
            <FontAwesomeIcon className="w-5 h-5" icon={icons[socialLink]} />
          </Link>
        ))}
      </div>
    </div>
  );
}
