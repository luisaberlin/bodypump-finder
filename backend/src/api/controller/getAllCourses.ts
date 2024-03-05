// @ts-ignore
import * as express from "express";
import { scrapAllCourses } from "../../handler/scrapCourses";

export async function getAllCourses(
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const courses = await scrapAllCourses();

    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
}
