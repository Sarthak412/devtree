// pages/api/click/[type]/[projectId].js

import { Page } from "@/models/Page";
import { getServerSession } from "next-auth";
import { atob } from "next/dist/compiled/@edge-runtime/primitives";
import { authOptions } from "../../auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type, projectId } = req.query;

    try {
      const session = await getServerSession(authOptions);

      const decodedProjectId = atob(projectId);

      const page = await Page.findOne({ owner: session?.user?.email });

      if (!page) {
        throw new Error("Page not found");
      }

      const linkType =
        type === "live"
          ? "liveLinkCount"
          : type === "github"
          ? "githubLinkCount"
          : null;

      if (
        linkType &&
        page.projectLinks &&
        page.projectLinks[decodedProjectId]
      ) {
        page.projectLinks[decodedProjectId][linkType] += 1;
        await page.save();

        // return res.status(200).json({ success: true });
      } else {
        return res
          .status(400)
          .json({ error: "Invalid link type or project not found" });
      }
    } catch (error) {
      console.error("Error updating click count:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
