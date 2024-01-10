"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SectionBox from "../layout/SectionBox";

import { ReactSortable } from "react-sortablejs";

import {
  faFloppyDisk,
  faGripLines,
  faLink,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { socialButtons } from "../../constants/index";
import { useState } from "react";
import SubmitBtn from "../buttons/SubmitBtn";
import { savePageButtons } from "@/actions/pageActions";
import toast from "react-hot-toast";

export default function PageButtonsForm({ user, page }) {
  const savedLinks = Object.keys(page.socialLinks);

  const pageSavedBtnInfo = savedLinks.map((k) =>
    socialButtons.find((b) => b.key === k)
  );

  const [activeBtn, setActiveBtn] = useState(pageSavedBtnInfo);

  function addSocialBtn(btn) {
    setActiveBtn((prevBtn) => {
      return [...prevBtn, btn];
    });
  }

  async function saveSocialLinks(formData) {
    await savePageButtons(formData);
    toast.success("Social Links Saved");
  }

  function removeLinkBtn({ key: keyToRemove }) {
    setActiveBtn((prevBtn) => {
      return prevBtn.filter((btn) => btn.key !== keyToRemove);
    });
  }

  const availableBtn = socialButtons.filter(
    (b1) => !activeBtn.find((b2) => b1.key === b2.key)
  );

  return (
    <SectionBox>
      <form action={saveSocialLinks}>
        <h2 className="text-xl flex items-center gap-2 font-semibold mb-3 px-1 py-1 text-gray-500">
          <FontAwesomeIcon icon={faLink} className="h-5 text-purple-600" />
          <span>Add Social Links</span>
        </h2>
        <ReactSortable handle=".handle" list={activeBtn} setList={setActiveBtn}>
          {activeBtn.map((btn) => (
            <div key={btn.label} className="mb-4 flex items-center">
              <div className="w-48 flex gap-2 items-center text-gray-600 p-2">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="text-gray-400 pr-4 cursor-pointer h-5 handle"
                />
                <FontAwesomeIcon icon={btn.icon} className="h-5" />
                <span className="capitalize">{btn.label}</span>
              </div>
              <input
                placeholder={btn.placeholder}
                name={btn.key}
                defaultValue={page.socialLinks[btn.key]}
                type="text"
                className="profile_form rounded-md"
                style={{ marginBottom: "0" }}
              />
              <button
                onClick={() => removeLinkBtn(btn)}
                type="button"
                className="px-4 py-2 bg-gray-400 rounded-r-md cursor-pointer text-white hover:bg-red-500 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ReactSortable>

        <div className="flex flex-wrap gap-2 mx-2 mt-4 border-y border-gray-300 py-4">
          {availableBtn.map((btn) => (
            <button
              type="button"
              onClick={() => addSocialBtn(btn)}
              key={btn.key}
              className="flex gap-2 px-4 py-2 border-2 border-gray-500 rounded-full bg-gray-300 items-center hover:bg-black/80 hover:text-white transition-all duration-300"
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
