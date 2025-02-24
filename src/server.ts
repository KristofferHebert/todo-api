import express from "express";
import cors from "cors";
import helmet from "helmet";

// This is the API server github repo: https://github.com/khebert/todo-api
import apiRoutes from "./api/routes";

const port = process.env.PORT || 3001;
``;
const dev = process.env.NODE_ENV !== "production";

const server = express();
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https:", "http:", "ws:", "wss:"],
        fontSrc: ["'self'", "https:", "data:"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'"],
      },
    },
  }),
);

server.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "http://localhost:3001",
    credentials: true,
  }),
);

server.use(express.json({ limit: "10kb" }));
server.use("/api", apiRoutes);

// server.all('*', (req, res) => {
//   return handle(req, res);
// });

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

export default server;
