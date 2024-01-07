import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faEye, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  // Aggregating 1st stage
  const groupedViews = await Event.aggregate(
    [
      {
        $match: {
          type: "view",
          uri: page.uri,
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
    ],
    { $sort: { _id: 1 } }
  );

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div>
      <SectionBox>
        <div className="flex items-center gap-3 justify-center my-5">
          <FontAwesomeIcon
            icon={faEye}
            size="lg"
            className="h-5 text-purple-600"
          />
          <span className="text-xl text-center font-semibold">Views</span>
        </div>
        <Chart
          data={groupedViews.map((obj) => ({
            date: obj._id,
            views: obj.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <div className="flex items-center gap-3 justify-center py-3 mb-4">
          <FontAwesomeIcon
            icon={faLink}
            size="lg"
            className="h-5 text-purple-600"
          />
          <span className="text-xl text-center font-semibold">
            Project Link Views
          </span>
        </div>
        {page.projectLinks.map((link) => (
          <div
            key={link.key}
            className="flex gap-4 items-center border-t border-gray-200 py-4"
          >
            <div className="text-purple-600 pl-4">
              <FontAwesomeIcon icon={faLink} size="lg" />
            </div>
            <div className="grow">
              <h3 className="text-2xl font-semibold text-gray-900">
                {link.projectTitle || "No title"}
              </h3>
              <div className="text-md flex flex-col gap-1">
                <div className="flex gap-1">
                  <span className="text-gray-500 font-semibold">
                    Live Link:
                  </span>
                  <a
                    target="_blank"
                    href={link.liveLink}
                    className="text-purple-600"
                  >
                    {link.liveLink}
                  </a>
                </div>
                <div className="flex gap-1">
                  <span className="text-gray-500 font-semibold">
                    GitHub Link:
                  </span>
                  <a
                    target="_blank"
                    href={link.githubLink}
                    className="text-purple-600"
                  >
                    {link.githubLink}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h1>Today: </h1>
              </div>
              <div>
                <h1>Total: </h1>
              </div>
            </div>
          </div>
        ))}
      </SectionBox>
    </div>
  );
}
