import { Request, Response, NextFunction } from "express";
import { studios } from "../../handler/scrapCourses";

export async function getSources(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.status(200).send(studios);
  } catch (err) {
    next(err);
  }
}
