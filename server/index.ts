import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
const port = parseInt(process.env.PORT || "5000", 10);

// Prefer explicit HOST env var; default to localhost on Windows to avoid ENOTSUP.
// If you need to bind to all interfaces later, set HOST=0.0.0.0 when running.
const host = process.env.HOST ?? "127.0.0.1";

// Only set reusePort on platforms that support it (avoid Windows where it can be unsupported)
const listenOptions: {
  port: number;
  host?: string;
  reusePort?: boolean;
} = {
  port,
  host,
};

if (process.platform !== "win32") {
  // SO_REUSEPORT / reusePort not reliably supported on Windows sockets in many environments.
  listenOptions.reusePort = true;
}

// Generic error handler for listen errors (EADDRINUSE, ENOTSUP, etc.)
httpServer.on("error", (err: any) => {
  console.error("HTTP server error:", err && err.code ? `${err.code}: ${err.message}` : err);

  if (err && err.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Use a different PORT or stop the occupying process.`);
  } else if (err && err.code === "ENOTSUP") {
    console.error(
      `Binding to host ${host} not supported on this platform/socket. Try using HOST=127.0.0.1 or run in a different environment.`,
    );
  }

  // graceful shutdown with failure status
  process.exitCode = 1;
  // give logs a moment; then exit (if desired uncomment next line)
  // process.exit(1);
});

httpServer.listen(listenOptions as any, () => {
  log(`serving on http://${host}:${port} (NODE_ENV=${process.env.NODE_ENV})`);
});

})();
