import { QueryClient, QueryFunction } from "@tanstack/react-query";

<<<<<<< HEAD
import { resolveApi } from "./api";
=======
>>>>>>> parent of 8036c87 (new code +++)
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
<<<<<<< HEAD
  data?: unknown
): Promise<Response> {
  const res = await fetch(resolveApi(url), {
=======
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
>>>>>>> parent of 8036c87 (new code +++)
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

<<<<<<< HEAD

// ------------------------------------------------------------
// Default Query FN for React Query
// ------------------------------------------------------------

=======
>>>>>>> parent of 8036c87 (new code +++)
type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: "returnNull" | "throw";
}) => QueryFunction<T> =
  ({ on401 }) =>
  async ({ queryKey }) => {
<<<<<<< HEAD
    const url = resolveApi(queryKey.join("/"));
    const res = await fetch(url, { credentials: "include" });
=======
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });
>>>>>>> parent of 8036c87 (new code +++)

    if (on401 === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return res.json();
  };

<<<<<<< HEAD

// ------------------------------------------------------------
// React Query Client
// ------------------------------------------------------------

=======
>>>>>>> parent of 8036c87 (new code +++)
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
