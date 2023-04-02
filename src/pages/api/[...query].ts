/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import rateLimit from "../../lib/ratelimit";
import { find_lyrics } from "@brandond/findthelyrics";

const limiter = rateLimit({
  max: 500,
  interval: 1000 * 60 * 60,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await limiter.check(res, 150, "CACHE_TOKEN");
      const { query } = req.query;
      if (query && query?.length <= 2 && query?.length !== 0) {
        try {
          console.log(
            `${decodeURIComponent(query[0] as string)} ${decodeURIComponent(
              query?.length > 1 ? (query[1] as string) : ""
            )}`
          );
          const lyrics = await find_lyrics(
            `${decodeURIComponent(query[0] as string)} ${decodeURIComponent(
              query?.length > 1 ? (query[1] as string) : ""
            )}`
          );
          res.setHeader(
            "Cache-Control",
            "public, s-maxage=86400, stale-while-revalidate=43200"
          );
          res.setHeader("Content-Type", "application/json");
          return res.status(200).json({
            lyrics: lyrics,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            id: uuidv4(),
          });
        } catch (error) {
          console.log(error);
          return res.status(404).json({ error: error });
        }
      } else {
        return res.status(400).json({ error: "Bad request" });
      }
    } catch {
      return res.status(429).json({ error: "You have used up your usage quota of 100 requests per hour, try again after some time." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
