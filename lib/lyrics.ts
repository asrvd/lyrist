import axios from "axios";

interface LyricsResponse {
  status: number;
  url?: string;
  album?: string;
  thumbnail?: string;
  artist?: string;
  release_date?: string;
  message?: string;
}

interface GeniusApiResponse {
  response: {
    sections: Array<{
      hits: Array<{
        result: {
          url?: string;
          full_title?: string;
          header_image_url?: string;
          primary_artist?: {
            name?: string;
          };
          release_date_for_display?: string;
        };
      }>;
    }>;
  };
}

export const fetchLyricsMetadata = async (
  searchTerm: string
): Promise<LyricsResponse> => {
  try {
    const target = `https://genius.com/api/search/multi?per_page=1&q=${encodeURIComponent(
      searchTerm
    )}`;

    // Define headers to mimic a browser request
    const headers = {
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://genius.com/",
      Origin: "https://genius.com",
    };

    // Make the API request
    const response = await axios.get<GeniusApiResponse>(target, { headers });
    const data = response.data;

    // Check if we have valid data
    if (
      !data?.response?.sections?.[0]?.hits?.length ||
      data.response.sections[0].hits.length <= 2
    ) {
      return {
        status: 500,
        message: `Unable to find song: ${searchTerm} or Internal Server Error!`,
      };
    }

    // Check if section 1 exists and has hits
    const section1 = data.response.sections[1];
    if (!section1?.hits?.length) {
      return {
        status: 500,
        message: `Unable to find song: ${searchTerm} or Internal Server Error!`,
      };
    }

    // Get the first hit
    const firstHit = section1.hits[0];
    if (!firstHit) {
      return {
        status: 500,
        message: `Unable to find song: ${searchTerm} or Internal Server Error!`,
      };
    }

    // Extract result data
    const result = firstHit.result;

    // Return the formatted response
    return {
      status: 200,
      url: result.url || "Not found",
      album: result.full_title || "Not found",
      thumbnail: result.header_image_url,
      artist: result.primary_artist?.name || "Not found",
      release_date: result.release_date_for_display || "Not found",
    };
  } catch (error) {
    // Handle any errors
    const err = error as Error;
    return {
      status: 500,
      message: err.message || "Internal Server Error",
    };
  }
};
