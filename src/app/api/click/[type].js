import { Event } from "@/models/Event";
import { Page } from "@/models/Page";

export default async function handler(req, res) {
  const { type } = req.query;
  const { encodedLink, pageUri } = req.body;

  try {
    console.log("Received encodedLink: ", encodedLink);

    const decodedLink = decodeURIComponent(encodedLink);

    console.log("Decoded Link: ", decodedLink);

    // Log the event
    await Event.create({ uri: pageUri, page: pageUri, type: type });

    // Update the click count based on the type
    const updateField =
      type === "live"
        ? "projectLinks.$.liveLinkClickCount"
        : "projectLinks.$.githubLinkClickCount";

    await Page.findOneAndUpdate(
      { uri: pageUri, [`projectLinks.${type}Link`]: decodedLink },
      { $inc: { [updateField]: 1 } }
    );

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
