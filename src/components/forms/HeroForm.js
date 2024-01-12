"use client";

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroForm({ user }) {
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect(`/account?desiredUsername=${username}`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length > 0) {
      if (user) {
        router.push(`/account?desiredUsername=${username}`);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="inline-flex items-center rounded-r-md bg-white shadow-md mt-3"
    >
      <span className="bg-white text-black py-3 pl-2">devtree.to/</span>
      <input
        className="py-2 border-none outline-none bg-white text-gray-500"
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        type="submit"
        className="bg-purple-700 text-white rounded-r-md px-4 py-3 hover:bg-purple-600 relative -ml-16 md:ml-0 whitespace-nowrap"
      >
        Join for free
      </button>
    </form>
  );
}
