import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AnalyticsPage() {
  // Connect to DB
  mongoose.connect(process.env.MONGO_URI);

  // Getting session
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const page = await Page.findOne({ owner: session?.user?.email });

  // const viewsCount = await Event.countDocuments({
  //   type: "view",
  //   uri: page.uri,
  // });

  // const githubClickCount = await Event.countDocuments({
  //   type: "click",
  //   uri: page.projectLinks.map((l) => l.githubLink),
  // });

  // const liveLinkCount = await Event.countDocuments({
  //   type: "click",
  //   uri: page.projectLinks.map((l) => l.liveLink),
  // });

  // Aggredating 1st stage
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: "Sarthakkk",
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
  ]);

  return (
    <div>
      <SectionBox>
        <Chart />
      </SectionBox>
    </div>
  );
}
