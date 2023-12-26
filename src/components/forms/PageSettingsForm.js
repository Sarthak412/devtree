"use client";

import {
  faFloppyDisk,
  faImage,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitBtn from "../buttons/SubmitBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveProfileInformation } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageSettingsForm({ page, user }) {
  async function saveProfileInfo(formData) {
    const result = await saveProfileInformation(formData);
    if (result) {
      toast.success("Profile Information Saved");
    }
  }

  return (
    <div className="-m-4 shadow">
      <form action={saveProfileInfo}>
        <div className=" bg-gradient-to-tl from-black to-blue-400 py-20 flex justify-end">
          <RadioTogglers
            options={[
              { value: "color", icon: faPalette, label: "Color" },
              { value: "image", icon: faImage, label: "Image" },
            ]}
          />
        </div>
        <div className="flex items-center justify-center -mb-8">
          <Image
            src={user?.image}
            alt="profile_image"
            width={140}
            height={140}
            className="rounded-full border-4 border-white relative -top-8 shadow-md shadow-black/30"
          />
        </div>
        <div className="p-4">
          <label htmlFor="nameIn" className="input_label">
            Account Name
          </label>
          <input
            type="text"
            id="nameIn"
            placeholder="John Doe"
            name="displayName"
            defaultValue={page.displayName}
            className="mt-1 profile_form"
          />
          <label htmlFor="location" className="input_label">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={page.location}
            placeholder="Somewhere in the world."
            className="mt-1 profile_form"
          />
          <label htmlFor="bio" className="input_label">
            Bio
          </label>
          <textarea
            type="text"
            id="bio"
            name="bio"
            defaultValue={page.bio}
            placeholder="Your Bio goes here..."
            className="mt-1 profile_form"
          />
          <div className="max-w-[300px] mx-auto">
            <SubmitBtn className="gap-4">
              <FontAwesomeIcon icon={faFloppyDisk} className="h-5" />
              <span>Save</span>
            </SubmitBtn>
          </div>
        </div>
      </form>
    </div>
  );
}
