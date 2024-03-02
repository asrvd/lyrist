import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "genius-lyrics";

const nullishQueries = ["None", "N/A", "null", "undefined"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = new Client();
    if (req.method === "GET") {
      const { query } = req.query;
      if (!Array.isArray(query) || !query) {
        return res.status(400).json({ error: "Bad request" });
      }
      if (
        query.length <= 2 &&
        query.length !== 0 &&
        !query.some((q) => nullishQueries.includes(q))
      ) {
        try {
          const searches = await client.songs.search(
            `${decodeURIComponent(query[0] as string)} ${decodeURIComponent(
              query?.length > 1 ? (query[1] as string) : ""
            )}`
          );
          const song = searches[0];
          const lyrics = await song?.lyrics();
          res.setHeader(
            "Cache-Control",
            "public, s-maxage=86400, stale-while-revalidate=43200"
          );
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", "*");

          return res.status(200).json({
            lyrics: lyrics,
            title: song?.title,
            artist: song?.artist.name,
            album: song?.album?.name,
            albumArt: song?.album?.image,
            releaseDate: song?.releasedAt,
            image: song?.image,
          });
        } catch (error) {
          console.log(error);
          return res.status(404).json({ error: "Lyrics not found" });
        }
      } else {
        return res.status(400).json({ error: "Bad request" });
      }
    } else {
      return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
