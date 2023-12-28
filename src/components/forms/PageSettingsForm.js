"use client";

import {
  faArrowUpFromBracket,
  faFloppyDisk,
  faImage,
  faPalette,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import RadioTogglers from "../formItems/RadioTogglers";
import Image from "next/image";
import SubmitBtn from "../buttons/SubmitBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { saveProfileInformation } from "@/actions/pageActions";
import toast from "react-hot-toast";
import { useState } from "react";

export default function PageSettingsForm({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType);

  const [color, setBgColor] = useState(page.bgColor);

  const [bgImage, setBgImage] = useState(page.bgImage);

  const [avatar, setAvatar] = useState(user?.image);

  async function saveProfileInfo(formData) {
    const result = await saveProfileInformation(formData);
    if (result) {
      toast.success("Profile Information Saved");
    }
  }

  async function upload(e, callbackFn) {
    const file = e.target.files?.[0];

    if (file) {
      const uploadPromise = new Promise((resolve, reject) => {
        const data = new FormData();
        data.set("file", file);
        fetch("/api/upload", {
          method: "POST",
          body: data,
        }).then((response) => {
          if (response.ok) {
            response.json().then((link) => {
              callbackFn(link);
              resolve(link);
            });
          } else {
            reject();
          }
        });
      });

      toast.promise(uploadPromise, {
        loading: "Uploading Image...",
        success: "Uploaded!",
        error: "Upload Error!!",
      });
    }
  }

  async function handleBgImageUpload(e) {
    await upload(e, (link) => {
      setBgImage(link);
    });
  }

  async function handleProfileImageUpload(e) {
    await upload(e, (link) => {
      setAvatar(link);
    });
  }

  return (
    <div className="-m-4 shadow">
      <form action={saveProfileInfo}>
        <div
          className="py-4 min-h-[250px] flex items-center justify-center bg-cover bg-center"
          style={
            bgType === "color"
              ? { backgroundColor: color }
              : { backgroundImage: `url(${bgImage})` }
          }
        >
          <div>
            <RadioTogglers
              defaultValue={page.bgType}
              options={[
                { value: "color", icon: faPalette, label: "Color" },
                { value: "image", icon: faImage, label: "Image" },
              ]}
              onChange={(val) => setBgType(val)}
            />

            {bgType === "color" && (
              <div className="bg-white mt-2 px-1 rounded-lg border border-gray-300 shadow backdrop-filter backdrop-blur-sm bg-opacity-40">
                <div className="flex gap-2 py-2 items-center justify-center">
                  <span className="text-gray-200 font-semibold">
                    Color Picker:{" "}
                  </span>
                  <input
                    className="w-8 h-6"
                    type="color"
                    name="bgColor"
                    onChange={(e) => setBgColor(e.target.value)}
                    defaultValue={page.bgColor}
                  />
                </div>
              </div>
            )}
            {bgType === "image" && (
              <div className="flex items-center justify-center">
                <label
                  type="button"
                  className="bg-white text-black shadow-sm shadow-gray-800 text-center py-2 px-3 mt-2 rounded-md font-semibold"
                >
                  <input type="hidden" name="bgImage" value={bgImage} />

                  <div className="flex items-center justify-center gap-2 cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleBgImageUpload}
                    />
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className="h-5"
                    />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center -mb-12">
          <div className="relative -top-8 w-[140px] h-[140px]">
            <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
              <Image
                src={avatar}
                alt="profile_image"
                width={140}
                height={140}
                className="w-full h-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar"
              className="absolute bottom-0 right-1 cursor-pointer p-[10px] rounded-full bg-white shadow shadow-gray-400 flex items-center hover:bg-purple-600 hover:text-white transition-all duration-300"
            >
              <FontAwesomeIcon icon={faPen} className="h-4" />
            </label>
            <input
              onChange={handleProfileImageUpload}
              type="file"
              className="hidden"
              id="avatar"
            />
            <input type="hidden" name="avatar" value={avatar} />
          </div>
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
