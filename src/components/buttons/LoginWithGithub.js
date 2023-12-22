"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { signIn } from "next-auth/react";

export default function LoginWithGithub() {
  return (
    <button
      onClick={() => signIn("github")}
      className="bg-black/90 text-center px-4 py-2.5 w-full rounded-md text-white flex items-center justify-center gap-5"
    >
      <FontAwesomeIcon icon={faGithub} className="h-5" />
      Sign-in with GitHub
    </button>
  );
}
