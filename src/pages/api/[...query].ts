import { getLyrics } from "../../../lib/lyricsProcessor";
import type { NextApiRequest, NextApiResponse } from "next";
import { ratelimit } from "../../utils/ratelimit";

const nullishQueries = ["None", "N/A", "null", "undefined"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Set CORS headers for all requests
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    // Handle OPTIONS method for preflight requests
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    if (req.method === "GET") {
      const ip =
        process.env.NODE_ENV === "development"
          ? "127.0.0.1"
          : req.headers["x-forwarded-for"] || req.headers["x-real-ip"];
      if (!ip) {
        return res.status(400).json({ error: "Bad request" });
      }
      // Apply rate limiting
      const { success, limit, reset, remaining } = await ratelimit.limit(
        ip as string
      );

      // Set rate limit headers
      res.setHeader("X-RateLimit-Limit", limit.toString());
      res.setHeader("X-RateLimit-Remaining", remaining.toString());
      res.setHeader("X-RateLimit-Reset", reset.toString());

      if (!success) {
        return res.status(429).json({
          error: "Too many requests",
          message: "Please try again later",
        });
      }

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
          if (!query[0] && !query[1]) {
            return res.status(400).json({ error: "Bad request" });
          }
          const lyrics = await getLyrics(`${query[0] ?? ""} ${query[1] ?? ""}`);
          res.setHeader(
            "Cache-Control",
            "public, s-maxage=86400, stale-while-revalidate=43200"
          );
          res.setHeader("Content-Type", "application/json");

          return res.status(200).json({
            lyrics: lyrics.lyrics,
            title: lyrics.album,
            artist: lyrics.artist,
            image: lyrics.thumbnail,
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default handler;
