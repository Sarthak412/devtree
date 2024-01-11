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

  // This will be used for fetching total clicks for today
  const today = new Date();

  today.setUTCHours(0, 0, 0, 0);

  // Aggregating 1st stage
  const groupedViews = await Event.aggregate([
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
    {
      $sort: { _id: 1 },
    },
  ]);

  const getMostVisitedLinks = await Event.aggregate([
    {
      $match: { type: "click", page: page.uri },
    },
    {
      $group: {
        _id: "$uri",
        count: { $sum: 1 },
      },
    },
    {
      $match: {
        count: { $gte: 5 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  // Aggregate for total clicks for current day
  const totalClicksToday = await Event.aggregate([
    {
      $match: {
        type: "click",
        page: page.uri, // contains page uri e.g. 'JohnDoe'
        createdAt: { $gte: today },
      },
    },
    {
      $group: {
        _id: null,
        totalClicksForToday: { $sum: 1 },
      },
    },
  ]);

  return (
    <div className="flex flex-col">
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

      <div className="grid md:grid-cols-2 lg:col-span-2 -mt-6">
        <div className="bg-white m-8 p-5 mx-5 md:mx-8 shadow col-span-2 md:col-span-2">
          <div className="flex py-2 px-1 justify-between border-b border-purple-100">
            <h1 className="mb-2 font-semibold text-lg text-gray-500">
              Most Visited Links
            </h1>
            <h1 className="font-regular text-gray-500 uppercase">Visitors</h1>
          </div>

          <ul className="mt-3">
            {getMostVisitedLinks.map((link) => (
              <div key={link._id} className="flex justify-between px-1">
                <div className="py-2">
                  <h1 className="text-purple-600 max-w-md">{link._id}</h1>
                </div>
                <div className="py-2 text-gray-600">{link.count}</div>
              </div>
            ))}
          </ul>
        </div>

        {!totalClicksToday ? (
          <div className="w-fit bg-white m-8 p-5 shadow mt-4">
            <div>
              <h1 className="text-2xl text-gray-500 font-semibold mb-4 mt-1 px-2 text-center">
                Total Clicks Today
              </h1>
              <h1 className="text-7xl text-center my-12  font-extrabold text-purple-800/70">
                0
              </h1>
            </div>
          </div>
        ) : (
          <div className="w-fit bg-white m-8 p-5 shadow mt-4">
            {totalClicksToday.map((click) => (
              <div key={click.totalClicksForToday}>
                <h1 className="text-2xl text-gray-500 font-semibold mb-4 mt-1 px-2 text-center">
                  Total Clicks Today
                </h1>
                <h1 className="text-7xl text-center my-12  font-extrabold text-purple-800/70">
                  {click.totalClicksForToday}
                </h1>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
