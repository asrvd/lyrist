import { fetchLyricsMetadata } from "./lyrics";
import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Gets lyrics for a song by name
 *
 * @param {string} query - The name of the song
 * @description Returns an object with status, url, album, artist, release_date, thumbnail, lyrics
 * @returns {Promise<LyricsResult>} The lyrics data
 */

interface LyricsResult {
  status: number;
  url?: string;
  album?: string;
  artist?: string;
  release_date?: string;
  thumbnail?: string;
  lyrics?: string;
  message?: string;
}

export const getLyrics = async (query: string): Promise<LyricsResult> => {
  try {
    if (!query) {
      return {
        status: 400,
        message: "Song name query is required!",
      };
    }

    const res = await fetchLyricsMetadata(query);

    if (res.status === 200 && res.url !== "Not found") {
      const headers = {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "max-age=0",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Sec-Gpc": "1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      };

      if (!res.url) {
        return {
          status: 500,
          message: "URL not found in response",
        };
      }

      const targetHtml = await axios.get(res.url, { headers: headers });
      let $ = cheerio.load(targetHtml.data);

      // Use the correct selector for lyrics containers
      const data1 = $("[data-lyrics-container]");
      const arrX: string[] = [];

      data1.each((_i: number, el: cheerio.Element) => {
        const dtx = $(el).html() || "";
        $ = cheerio.load(dtx, {
          normalizeWhitespace: true,
        });
        $("br").replaceWith("\n");
        const XRT = $.root().text();
        arrX.push(XRT);
      });

      const maindata = arrX.join("\n");

      if (!maindata || maindata === "") {
        return {
          status: 500,
          message: `Unable to find song: ${query} or Internal Server Error!`,
        };
      } else {
        return {
          status: 200,
          url: res.url || "Not Found",
          album: res.album || "Not Found",
          artist: res.artist || "Not Found",
          release_date: res.release_date || "Not Found",
          thumbnail: res.thumbnail || "Not Found",
          lyrics: maindata || "Not Found",
        };
      }
    } else {
      return res;
    }
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message || "Failed to get lyrics");
  }
};
