import type { NextApiResponse } from "next";
import LRU from "lru-cache";

// ratelimiting of 100 requests per hour

type Options = {
  max?: number;
  interval?: number;
};

export default function rateLimit(options: Options = {}) {
  const max = options.max || 500;
  const interval = options.interval || 1000 * 60 * 60;
  const tokenCache = new LRU({
    max: max,
    ttl: interval,
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0] || 0;
        const isRateLimited = currentUsage >= limit;
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
}
