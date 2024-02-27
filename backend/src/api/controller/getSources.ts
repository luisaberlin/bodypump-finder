import * as express from "express";
import { studios } from "../../handler/scrapCourses";

export async function getSources(
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    res.status(200).send(studios);
  } catch (err) {
    next(err);
  }
}
