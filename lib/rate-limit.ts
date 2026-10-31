type Bucket = { count: number; reset: number };
const buckets = new Map<string, Bucket>();

function memoryLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  current.count += 1;
  return current.count <= max;
}

async function upstashLimit(key: string, max: number, windowMs: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return memoryLimit(key, max, windowMs);

  const windowSec = Math.ceil(windowMs / 1000);
  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      ["INCR", `rl:${key}`],
      ["EXPIRE", `rl:${key}`, windowSec, "NX"],
    ]),
  });
  if (!response.ok) return memoryLimit(key, max, windowMs);
  const data = (await response.json()) as Array<{ result?: number }>;
  const count = Number(data?.[0]?.result ?? 1);
  return count <= max;
}

export async function rateLimit(key: string, max: number, windowMs: number) {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return upstashLimit(key, max, windowMs);
  }
  return memoryLimit(key, max, windowMs);
}

export function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}
