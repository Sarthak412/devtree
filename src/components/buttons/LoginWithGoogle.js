"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { signIn } from "next-auth/react";

export default function LoginWithGoogle() {
  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/account" })}
      className="bg-purple-700 text-center px-4 py-2.5 w-full rounded-md text-white flex items-center justify-center gap-5 hover:bg-purple-600 transition-all duration-300"
    >
      <FontAwesomeIcon icon={faGoogle} className="h-5" />
      <span>Sign-in with Google</span>
    </button>
  );
}
