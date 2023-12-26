"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

export async function saveProfileInformation(formData) {
  // Connecting to DB before saving the data
  await mongoose.connect(process.env.MONGO_URI);

  const session = await getServerSession(authOptions);

  if (session) {
    const displayName = formData.get("displayName");
    const location = formData.get("location");
    const bio = formData.get("bio");

    await Page.updateOne(
      { owner: session?.user?.email },
      { displayName, location, bio }
    );

    return true;
  }

  return false;
}
