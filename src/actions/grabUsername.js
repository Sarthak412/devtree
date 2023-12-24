"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const grabUsername = async (formData) => {
  const username = formData.get("username");

  //   Connect to DB
  mongoose.connect(process.env.MONGO_URI);

  const existingPageDoc = await Page.findOne({ uri: username });

  if (existingPageDoc) {
    return false;
  } else {
    const session = await getServerSession(authOptions);
    return await Page.create({ uri: username, owner: session?.user?.email });
  }
};

export default grabUsername;
