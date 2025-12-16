import { QueryClient, QueryFunction } from "@tanstack/react-query";

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
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // ✅ REQUIRED for session cookies
  });

  await throwIfResNotOk(res);
  return res;
}

/* -------------------- queryFn factory -------------------- */
type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn =
  <T>({ on401 }: { on401: UnauthorizedBehavior }): QueryFunction<T> =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include", // ✅ REQUIRED
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
