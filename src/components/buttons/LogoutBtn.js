"use client";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-black/90 px-3 py-2 rounded flex items-center gap-2 text-white hover:bg-purple-700 transition-all duration-300"
    >
      <span>Logout</span>
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
}
