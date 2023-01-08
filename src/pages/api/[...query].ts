/* eslint-disable @typescript-eslint/no-unused-vars */

import { getLyrics } from "lyrics-dumper";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log(req.query);
    const { query } = req.query;

    if (query?.length === 2) {
      const lyrics = await getLyrics(
        `${decodeURIComponent(query[0] as string)} ${decodeURIComponent(
          query[1] as string
        )}`
      );
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=86400, stale-while-revalidate=43200"
      );
      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(lyrics);
    } else {
      return res.status(400).json({ error: "Bad request" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
