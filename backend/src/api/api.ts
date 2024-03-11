import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getSources } from "./controller/getSources";
import { getCourses } from "./controller/getCourses";

export function buildApi() {
  const app = express();

  const origin =
    process.env.NODE_ENV === "prod"
      ? ["https://bodypump-finder-ui.onrender.com"]
      : [
          "http://localhost:5173",
          "http://localhost:4173",
          "http://127.0.0.1:5173",
        ];
  app.use(cors({ origin }));

  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(new Date().toISOString(), req.method, req.url);
    next();
  });

  app.use(express.json());

  // app.get("/api", async (req: Request, res: Response, next: NextFunction) => {
  //   await getCourses(req, res, next);
  // });

  app.get("/api", async (req: Request, res: Response, next: NextFunction) => {
    await getCourses(req, res, next);
  });

  app.get(
    "/api/sources",
    async (req: Request, res: Response, next: NextFunction) => {
      await getSources(req, res, next);
    }
  );

  app.use(function (_req: Request, res: Response, _next: NextFunction) {
    const err = new Error("Method Not Allowed.");
    res.status(500).send(err);
  });

  return app;
}
