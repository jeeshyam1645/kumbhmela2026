import { QueryClient, QueryFunction } from "@tanstack/react-query";

import { resolveApi } from "./api";
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown
): Promise<Response> {
  const res = await fetch(resolveApi(url), {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}


// ------------------------------------------------------------
// Default Query FN for React Query
// ------------------------------------------------------------

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn: <T>(options: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
    const url = resolveApi(queryKey.join("/"));
    const res = await fetch(url, { credentials: "include" });

    if (on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return res.json();
  };


// ------------------------------------------------------------
// React Query Client
// ------------------------------------------------------------

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
