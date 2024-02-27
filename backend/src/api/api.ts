import express from "express";
import cors from "cors";
import { getAllCourses } from "./controller/getAllCourses";
import { getSources } from "./controller/getSources";

export function buildApi() {
  const app = express();

  app.use(cors({ origin: "http://localhost:5173" }));

  app.use(express.json());

  app.get("/api", async (req, res, next) => {
    await getAllCourses(req, res, next);
  });

  app.get("/api/sources", async (req, res, next) => {
    await getSources(req, res, next);
  });

  app.use(function (_req, res, _next) {
    const err = new Error("Method Not Allowed.");
    res.status(500).send(err);
  });

  return app;
}
