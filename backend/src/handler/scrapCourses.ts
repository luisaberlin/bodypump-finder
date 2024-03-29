import axios from "axios";
import * as cheerio from "cheerio";
import { getStartDate } from "../utils/date";

export enum StudioNames {
  POTSDAMERPLATZ = "Potsdamerplatz",
  GENDARMENMARKT = "Gendarmenmarkt",
  BISMARCKSTRASSE = "Bismarckstraße",
  OSTKREUZ = "Ostkreuz",
}

export const studios = [
  {
    name: StudioNames.POTSDAMERPLATZ,
    url: "https://www.eversports.de/widget/w/2obfkr",
  },
  {
    name: StudioNames.GENDARMENMARKT,
    url: "https://www.eversports.de/widget/w/n07bx2",
  },
  {
    name: StudioNames.BISMARCKSTRASSE,
    url: "https://www.eversports.de/widget/w/yyf0vb",
  },
  {
    name: StudioNames.OSTKREUZ,
    url: "https://www.eversports.de/widget/w/3om7pa",
  },
];

export const studiosNew = [
  {
    name: StudioNames.POTSDAMERPLATZ,
    shortId: "2obfkr",
  },
  {
    name: StudioNames.GENDARMENMARKT,
    shortId: "n07bx2",
  },
  {
    name: StudioNames.BISMARCKSTRASSE,
    shortId: "yyf0vb",
  },
  {
    name: StudioNames.OSTKREUZ,
    shortId: "3om7pa",
  },
];

export interface GymData {
  [key: string]: IExtendedCourseData[][];
}

interface IExtendedCourseData {
  weekday: string;
  time: string;
  sessionName: string;
  availability: string;
  trainer: string;
  location: string;
  //   date: string;
  //   room: string;
}

type CourseData = Omit<IExtendedCourseData, "weekday" | "location">;

function getWeekdayByIndex(number: number): string {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const index = number % 7;
  const weekday = weekdays[index];
  if (!weekday) throw new Error("No weekday by dayIndex");
  return weekday;
}

function selectCoursesPerDay(selector: cheerio.Root, element: cheerio.Element) {
  let coursesPerDay: CourseData[] = [];

  selector(element)
    .children(".calendar__row")
    .children(".calendar__single-slot-container")
    .each((_index, element) => {
      const time = selector(element)
        .find(".session-time")
        .text()
        .split(" ● ")[0];
      const sessionName = selector(element).find(".session-name").text();

      let availability: string | undefined = "";
      let trainer = "";
      //   let room = "";
      const ellipsis = selector(element).children(".ellipsis");
      ellipsis.each((childIndex, childElement) => {
        switch (childIndex) {
          case 0:
            const text = selector(childElement).text();
            availability = text === "sold out" ? text : text.split(" ")[0];
            break;
          case 1:
            trainer = selector(childElement).text();
            break;
          //   case 2:
          //     room = selector(childElement).text();
          //     break;
        }
      });

      if (sessionName.toLocaleLowerCase().includes("bodypump")) {
        coursesPerDay.push({
          time: time ? time : "No time",
          sessionName,
          availability: availability ? availability : "No availability",
          trainer,
        });
      }
    });

  return coursesPerDay;
}

function selectCoursesPerStudio(selector: cheerio.Root, studioName: string) {
  let courses = Array<IExtendedCourseData[]>(7).fill([]);

  selector(".calendar__slot-list").each((dayIndex, element) => {
    const weekday = getWeekdayByIndex(dayIndex);
    const coursesPerDay = selectCoursesPerDay(selector, element);

    if (coursesPerDay.length === 0) return;

    const extendedCoursesPerDay = coursesPerDay.map((course) => {
      return {
        weekday,
        ...course,
        location: studioName,
      } as IExtendedCourseData;
    });

    const course = courses[dayIndex % 7];
    if (!course) throw new Error("No course by this dayIndex");
    const allCoursesPerDay = course.concat(extendedCoursesPerDay);

    const times = allCoursesPerDay.map(({ time }) => time);
    const coursesWithoutDuplicates = allCoursesPerDay.filter(
      ({ time }, index) => !times.includes(time, index + 1)
    );

    courses[dayIndex % 7] = coursesWithoutDuplicates;
  });
  return courses;
}

/**
 * @param date iso string
 * @returns all Bodypump courses of the week to which this date belongs
 */
export async function scrapCourses(date: string) {
  let coursesPerStudio: GymData = {};

  const startDate = getStartDate(date);

  await Promise.all(
    studiosNew.map(async (studio) => {
      const url = `https://www.eversports.de/widget/api/eventsession/calendar?facilityShortId=${studio.shortId}&startDate=${startDate}&activeEventType=universal`;

      const response = await axios.get(url);

      const selector = cheerio.load(response.data.data.html);

      const courses: IExtendedCourseData[][] = selectCoursesPerStudio(
        selector,
        studio.name
      );

      coursesPerStudio = { ...coursesPerStudio, [studio.name]: courses };
    })
  );

  return coursesPerStudio;
}
