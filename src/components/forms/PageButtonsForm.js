"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";
import {
  faFloppyDisk,
  faLink,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { socialButtons } from "../../constants/index";
import { useState } from "react";
import SubmitBtn from "../buttons/SubmitBtn";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageButtonsForm({ user, page }) {
  //   const savedLinks = Object.keys(page.socialLinks);

  const [activeBtn, setActiveBtn] = useState([]);

  function addSocialBtn(btn) {
    setActiveBtn((prevBtn) => {
      return [...prevBtn, btn];
    });
  }

  const availableBtn = socialButtons.filter(
    (b1) => !activeBtn.find((b2) => b1.key === b2.key)
  );

  async function saveSocialLinks(formData) {
    await savePageButtons(formData);
    toast.success("Social Links Saved");
  }

  return (
    <SectionBox>
      {/* {JSON.stringify(savedLinks)} */}
      <form action={saveSocialLinks}>
        <h2 className="text-xl flex items-center gap-2 font-semibold mb-3 px-1 py-1 text-gray-500">
          <FontAwesomeIcon icon={faLink} className="h-5 text-purple-600" />
          <span>Add Social Links</span>
        </h2>

        {activeBtn.map((btn) => (
          <div key={btn.label} className="mb-4 flex items-center">
            <div className="w-36 flex gap-2 items-center text-gray-600 p-2">
              <FontAwesomeIcon icon={btn.icon} className="h-5" />
              <span className="capitalize">{btn.label}</span>
            </div>
            <input
              placeholder={btn.placeholder}
              name={btn.key}
              type="text"
              className="profile_form rounded-md"
              style={{ marginBottom: "0" }}
            />
          </div>
        ))}

        <div className="flex flex-wrap gap-2 mt-4 border-y border-gray-300 py-4">
          {availableBtn.map((btn) => (
            <button
              type="button"
              onClick={() => addSocialBtn(btn)}
              key={btn.key}
              className="flex gap-2 px-4 py-2 border-2 border-gray-600 rounded-full bg-gray-300 items-center hover:bg-black/80 hover:text-white transition-all duration-300"
            >
              <FontAwesomeIcon icon={btn.icon} className="h-5" />
              <span className="font-semibold capitalize">{btn.label}</span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-4 ">
          <SubmitBtn className="gap-3">
            <FontAwesomeIcon icon={faFloppyDisk} className="h-5" />
            <span>Save</span>
          </SubmitBtn>
        </div>
      </form>
    </SectionBox>
  );
}
