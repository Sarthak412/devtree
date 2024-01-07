"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faCloudUpload,
  faGripLines,
  faLink,
  faPlusCircle,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import SubmitBtn from "../buttons/SubmitBtn";
import { useState } from "react";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { ReactSortable } from "react-sortablejs";
import { upload } from "@/libs/upload";
import Image from "next/image";
import { savePageLinks } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageLinksForm({ page, user }) {
  const [links, setLinks] = useState(page.projectLinks || []);

  async function save() {
    await savePageLinks(links);
    toast.success("Project Links Saved");
  }

  function addNewProjectLink() {
    setLinks((prev) => {
      return [
        ...prev,
        {
          key: Date.now().toString(),
          projectTitle: "",
          description: "",
          icon: "",
          technologies: "",
          liveLink: "",
          githubLink: "",
          liveLinkClickCount: 0,
          githubLinkClickCount: 0,
        },
      ];
    });
  }

  function handleUpload(e, linkKeyForUpload) {
    upload(e, (uploadedImageURL) => {
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageURL;
          }
        });
        return newLinks;
      });
    });
  }

  function handleLinkChange(keyOfLinkToChange, prop, e) {
    setLinks((prev) => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = e.target.value;
        }
      });
      return [...prev];
    });
  }

  function removeProjectLink(linkKeyToRemove) {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToRemove)
    );
  }

  return (
    <SectionBox>
      <form action={save}>
        <h2 className="text-xl flex items-center gap-2 font-semibold mb-3 px-1 py-1 text-gray-500">
          <FontAwesomeIcon icon={faLink} className="h-5 text-purple-600" />
          <span>Project Links</span>
        </h2>
        <button
          type="button"
          onClick={addNewProjectLink}
          className="text-purple-600 text-lg flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faPlusCircle} className=" px-1 h-6" />
          <span>Add new project links</span>
        </button>
        <div className="px-2">
          <ReactSortable handle=".handle" list={links} setList={setLinks}>
            {links.map((link) => (
              <div key={link.key} className="mt-8 flex items-center gap-6">
                <div className="handle">
                  <FontAwesomeIcon
                    icon={faGripLines}
                    className="text-gray-500 mr-2 cursor-grab h-5"
                  />
                </div>
                <div className="text-center px-2">
                  <div
                    className={`${
                      link.icon ? "" : "bg-gray-200"
                    } inline-block relative aspect-square overflow-hidden w-44 h-28 inline-flex justify-center items-center`}
                  >
                    {link.icon && (
                      <Image
                        // className="w-full h-full"
                        src={link.icon}
                        alt={"Project Icon/Logo"}
                        width={180}
                        height={180}
                      />
                    )}

                    {!link.icon && (
                      <FontAwesomeIcon
                        icon={faImage}
                        size="2xl"
                        className="w-6 text-gray-700"
                      />
                    )}
                  </div>
                  <div className="mt-3">
                    <input
                      type="file"
                      onChange={(e) => handleUpload(e, link.key)}
                      id={"icon" + link.key}
                      className="hidden"
                    />
                    <label
                      htmlFor={"icon" + link.key}
                      className="text-md text-black bg-white mb-4 border cursor-pointer border-gray-300 shadow flex items-center justify-center gap-2 rounded-full mt-2 px-3 py-2 font-semibold hover:scale-95 transition-all duration-300 hover:shadow-md"
                    >
                      <FontAwesomeIcon icon={faCloudUpload} className="h-4" />
                      <span>Add Logo</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => removeProjectLink(link.key)}
                      className=" flex gap-2 items-center bg-black px-4 py-2 rounded-full h-full hover:scale-95 transition-all duration-300 shadow-md shadow-purple-400 hover:shadow-none"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-white h-4"
                      />
                      <span className="text-white font-semibold">
                        Remove Project
                      </span>
                    </button>
                  </div>
                </div>
                <div className="grow">
                  <label className="text-lg text-gray-600">Project Title</label>
                  <input
                    value={link.projectTitle}
                    onChange={(e) =>
                      handleLinkChange(link.key, "projectTitle", e)
                    }
                    type="text"
                    placeholder="Project Title"
                    className="profile_form"
                  />
                  <label className="text-lg text-gray-600">Description</label>
                  <input
                    value={link.description}
                    onChange={(e) =>
                      handleLinkChange(link.key, "description", e)
                    }
                    type="text"
                    placeholder="Project Description"
                    className="profile_form"
                  />
                  <label className="text-lg text-gray-600">Technologies</label>
                  <input
                    value={link.technologies}
                    onChange={(e) =>
                      handleLinkChange(link.key, "technologies", e)
                    }
                    type="text"
                    placeholder="Project Technologies"
                    className="profile_form"
                  />
                  <label className="text-lg text-gray-600">
                    Project Live URL
                  </label>
                  <input
                    value={link.liveLink}
                    onChange={(e) => handleLinkChange(link.key, "liveLink", e)}
                    type="text"
                    placeholder="Project Live URL"
                    className="profile_form"
                  />
                  <label className="text-lg text-gray-600">GitHub URL</label>
                  <input
                    value={link.githubLink}
                    onChange={(e) =>
                      handleLinkChange(link.key, "githubLink", e)
                    }
                    type="text"
                    placeholder="Project GitHub Link"
                    className="profile_form"
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitBtn className="max-w-xs mx-auto flex gap-3">
            <FontAwesomeIcon icon={faSave} className="h-5" />
            <span>Save</span>
          </SubmitBtn>
        </div>
      </form>
    </SectionBox>
  );
}
