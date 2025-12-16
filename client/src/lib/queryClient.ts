import { QueryClient, QueryFunction } from "@tanstack/react-query";

// 1. DEFINE YOUR BACKEND URL
// This ensures Vercel points to Render, while keeping localhost flexible if you use env vars.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://magh-mela-backend.onrender.com";

/* -------------------- helpers -------------------- */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/* -------------------- apiRequest (mutations) -------------------- */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  // 2. PREPEND BASE_URL TO THE REQUEST URL
  // If url is "/api/login", fullUrl becomes "https://magh-mela-backend.onrender.com/api/login"
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // ✅ REQUIRED: Sends the session cookie to Render
  });

  await throwIfResNotOk(res);
  return res;
}

/* -------------------- queryFn factory -------------------- */
type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  <T>({ on401 }: { on401: UnauthorizedBehavior }): QueryFunction<T> =>
  async ({ queryKey }) => {
    // 3. CONSTRUCT FULL URL FROM QUERY KEY
    const path = queryKey.join("/");
    const fullUrl = path.startsWith("http") ? path : `${BASE_URL}${path}`;

    const res = await fetch(fullUrl, {
      credentials: "include", // ✅ REQUIRED: Sends the session cookie to Render
    });

    if (res.status === 401) {
      if (on401 === "returnNull") {
        return null as T;
      }
      throw new Error("Unauthorized");
    }

    await throwIfResNotOk(res);
    return res.json();
  };

/* -------------------- QueryClient -------------------- */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }), // default behavior
      staleTime: Infinity,
      retry: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
    mutations: {
      retry: false,
    },
  },
});