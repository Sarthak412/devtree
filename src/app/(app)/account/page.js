import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

// * Actions
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);

  const desiredUsername = searchParams.desiredUsername;

  // If session is not present it will redirect you to Homepage
  if (!session) {
    redirect("/");
  }

  // Connect to DB
  mongoose.connect(process.env.MONGO_URI);

  const page = await Page.findOne({ owner: session?.user?.email });

  if (page) {
    return (
      <>
        <PageSettingsForm page={page} user={session.user} />
        <PageButtonsForm page={page} user={session.user} />
      </>
    );
  }

  return (
    <div className="bg-white border shadow rounded-md max-w-md py-5 mx-auto">
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
