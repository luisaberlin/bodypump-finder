import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { getAllCourses } from "./controller/getAllCourses";
import { getSources } from "./controller/getSources";

export function buildApi() {
  const app = express();

  const origin =
    process.env.NODE_ENV === "production"
      ? ["https://bodypump-finder-ui.onrender.com"]
      : ["http://localhost:5173", "http://localhost:4173"];
  app.use(cors({ origin }));

  app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(
      JSON.stringify({
        method: req.method,
        url: req.url,
        query: req.query,
        params: req.params,
        body: req.body,
      })
    );
    next();
  });

  app.use(express.json());

  app.get("/api", async (req: Request, res: Response, next: NextFunction) => {
    await getAllCourses(req, res, next);
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
