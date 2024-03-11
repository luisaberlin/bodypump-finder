import * as express from "express";
import { scrapCourses } from "../../handler/scrapCourses";

export async function getCourses(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const date = req.query.date as string;

    const courses = await scrapCourses(date);

    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
}
