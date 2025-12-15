const ENV_API = import.meta.env.VITE_API_URL;

/**
 * Hybrid API resolver:
 * - In production (Vercel): use relative /api (rewrites apply)
 * - In local dev: use VITE_API_URL
 */
export function resolveApi(path: string) {
  if (import.meta.env.PROD) {
    return path; // "/api/..."
  }
  return `${ENV_API}${path}`;
}
