import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();

// --- FIX 1: TRUST PROXY (REQUIRED FOR RENDER) ---
// Render puts your app behind a load balancer. 
// This allows Express to trust the "X-Forwarded-Proto" header (https).
app.set("trust proxy", 1); 

// --- FIX 2: CONFIGURE CORS CORRECTLY ---
app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);

    // 2. Define your allowed static domains
    const allowedOrigins = [
      "http://localhost:5173",
      "https://kumbhmela2026.vercel.app", // Main production domain
      process.env.FRONTEND_URL            // From your Render env vars
    ];

    // 3. Check if origin matches allowed list OR ends with .vercel.app
    if (
      allowedOrigins.includes(origin) || 
      origin.endsWith(".vercel.app") // Automatically allows ALL Vercel previews
    ) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Essential for cookies
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Middleware to parse JSON and Raw Body
app.use(
  express.json({
    limit: "50mb",
    verify: (req, _res, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Logging Helper
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Request Logging Middleware
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
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  // 1. REGISTER ROUTES & CREATE SERVER
  // NOTE: Your session/auth setup is likely inside this function.
  // See the "IMPORTANT" note below.
  const httpServer = await registerRoutes(app);

  // 2. ERROR HANDLING
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // 3. SETUP - PRODUCTION MODE
  if (app.get("env") === "production") {
    app.get("/", (_req, res) => {
      res.json({ message: "Magh Mela API is running. Frontend is hosted on Vercel." });
    });
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // 4. START SERVER
  const port = parseInt(process.env.PORT || "5000", 10);
  const host = process.env.HOST ?? "0.0.0.0";

  const listenOptions: {
    port: number;
    host?: string;
    reusePort?: boolean;
  } = {
    port,
    host,
  };

  if (process.platform !== "win32") {
    listenOptions.reusePort = true;
  }

  httpServer.on("error", (err: any) => {
    console.error("HTTP server error:", err && err.code ? `${err.code}: ${err.message}` : err);
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${port} is already in use.`);
    }
    process.exit(1);
  });

  httpServer.listen(listenOptions as any, () => {
    log(`serving on http://${host}:${port}`);
  });
})();