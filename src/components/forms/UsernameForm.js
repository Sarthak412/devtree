"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// * Actions
import grabUsername from "@/actions/grabUsername";
import { useState } from "react";
import { redirect } from "next/navigation";
import SubmitBtn from "../buttons/SubmitBtn";

export default function UsernameForm({ desiredUsername }) {
  const [taken, setTaken] = useState(false);

  async function handleSubmit(formData) {
    const result = await grabUsername(formData);

    setTaken(result === false);

    if (result) {
      redirect(`/account?created=${formData.get("username")}`);
    }
  }

  return (
    <form action={handleSubmit}>
      <h1 className="text-2xl font-semibold text-center pt-4 text-gray-800">
        Claim your username
      </h1>
      <p className="text-center text-gray-600 text-md mb-5">
        Choose your username
      </p>
      <div className="max-w-sm mx-4 md:mx-auto space-y-3">
        <input
          name="username"
          className="block p-2 border mb-1 text-gray-600 mx-auto w-full text-center"
          defaultValue={desiredUsername}
          type="text"
          placeholder="Username"
        />
        {taken && (
          <div className="text-red-900 text-sm bg-red-400/60 py-2 px-2 pl-5 border border-red-400">
            This username is already taken.
          </div>
        )}
        <SubmitBtn>
          <span>Claim your username</span>
          <FontAwesomeIcon icon={faArrowRight} className="h-4" />
        </SubmitBtn>
      </div>
    </form>
  );
}
