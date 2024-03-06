import * as express from "express";
import { scrapCoursesNextWeek } from "../../handler/scrapCourses";

export async function getCoursesNextWeek(
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const courses = await scrapCoursesNextWeek();

    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
}
