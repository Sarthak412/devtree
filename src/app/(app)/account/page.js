import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

// * Actions
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import { cloneDeep } from "lodash";

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

  if (!page) {
    return (
      <div>
        <UsernameForm desiredUsername={desiredUsername} />
      </div>
    );
  }

  const leanPage = cloneDeep(page.toJSON());
  leanPage._id = leanPage._id.toString();

  return (
    <>
      <PageSettingsForm page={leanPage} user={session.user} />
      <PageButtonsForm page={leanPage} user={session.user} />
      <PageLinksForm page={leanPage} user={session.user} />
    </>
  );
}
