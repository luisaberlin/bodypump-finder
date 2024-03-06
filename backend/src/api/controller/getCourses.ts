import * as express from "express";
import { scrapCourses } from "../../handler/scrapCourses";

export async function getCourses(
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const courses = await scrapCourses();

    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
}
