import { ModeToggle } from "@/components/buttons/DarkModeToggle";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import mongoose from "mongoose";
import Image from "next/image";

export default async function DevtreePage({ params }) {
  const uri = params.uri;

  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ uri: uri });

  const user = await User.findOne({ email: page.owner });

  return (
    <div className="bg-white dark:bg-black">
      <div
        className=" h-36 bg-gray-300 bg-cover bg-center"
        style={
          page.bgType === "color"
            ? { backgroundColor: page.color }
            : { backgroundImage: `url(${page.bgImage})` }
        }
      >
        <div className="flex justify-end px-5 py-4">
          <ModeToggle />
        </div>
      </div>
      <div className="aspect-square w-36 h-36 mx-auto relative -mt-16">
        <Image
          className="rounded-full w-full h-full border-4 shadow border-gray-200 object-cover"
          src={user.image}
          alt="avatar"
          width={190}
          height={190}
        />
      </div>
      <h2>{page.displayName}</h2>
      <h2>{page.location}</h2>
      <h2>{page.bio}</h2>
    </div>
  );
}
