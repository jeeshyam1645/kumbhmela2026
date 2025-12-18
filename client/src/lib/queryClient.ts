import { QueryClient, QueryFunction } from "@tanstack/react-query";

// 1. HARDCODE THIS URL TEMPORARILY TO BE 100% SURE
const BASE_URL = "https://api.maghmelastays.in";

/* -------------------- helpers -------------------- */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/* -------------------- apiRequest (For Mutations like Login/Logout) -------------------- */
export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  // Construct the URL
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  // 🔍 DEBUG LOG: Check this in your browser console
  console.log(`[DEBUG-MUTATION] Method: ${method}, Full URL:`, fullUrl);

  const res = await fetch(fullUrl, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // ✅ CRITICAL
  });

  await throwIfResNotOk(res);
  return res;
}

/* -------------------- queryFn (For useAuth / useQuery) -------------------- */
type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  <T>({ on401 }: { on401: UnauthorizedBehavior }): QueryFunction<T> =>
  async ({ queryKey }) => {
    // Construct the URL
    const path = queryKey.join("/");
    const fullUrl = path.startsWith("http") ? path : `${BASE_URL}${path}`;

    // 🔍 DEBUG LOG: Check this in your browser console
    console.log(`[DEBUG-QUERY] Fetching Data, Full URL:`, fullUrl);

    const res = await fetch(fullUrl, {
      credentials: "include", // ✅ CRITICAL
    });

    if (res.status === 401) {
      console.warn(`[DEBUG-QUERY] 401 Unauthorized received from:`, fullUrl);
      if (on401 === "returnNull") {
        return null as T;
      }
      throw new Error("Unauthorized");
    }

    await throwIfResNotOk(res);
    return res.json();
  };

/* -------------------- QueryClient Config -------------------- */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      staleTime: 5 * 60 * 1000, 
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});