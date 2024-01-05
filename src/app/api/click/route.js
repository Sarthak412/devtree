import { Event } from "@/models/Event";
import mongoose from "mongoose";
import { atob } from "next/dist/compiled/@edge-runtime/primitives";

export async function POST(req) {
  // Connecting to the DB
  mongoose.connect(process.env.MONGO_URI);
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get("url"));
  const page = url.searchParams.get("page");
  await Event.create({ type: "click", uri: clickedLink, page: page });
  return Response.json(true);
}
