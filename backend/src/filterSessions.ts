// import { GymData, StudioNames } from ".";
// import { IExtendedCourseData } from "./scrapData";

// export interface IFilter {
//   includedStudios: Array<StudioNames>;
//   days: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
// }

// function containsStudio(studios: StudioNames[], key: string): boolean {
//   return studios.some((studio) => studio.toString() === key);
// }

// function filterDays(data: GymData, daysToKeep: number[]) {
//   // for (const [key, value] of map.entries()) {
//   //   map.set(
//   //     key,
//   //     value.filter((_day, index) => daysToKeep.includes(index))
//   //   );
//   // }

//   Object.keys(data).forEach((studio) => {
//     const coursesPerWeek = data[studio];

//   })

//   for (const [key, value] of data.entries()) {
//     data.set(
//       key,
//       value.map((day, index) => {
//         if (daysToKeep.includes(index)) {
//           return day;
//         }
//         return [];
//       })
//     );
//   }
// }

// export function filterSessions(
//   myMap: Map<string, IExtendedCourseData[][]>,
//   filter: IFilter
// ) {
//   let filteredResult = new Map<string, IExtendedCourseData[][]>(
//     Array.from(myMap.entries()).filter(([key, _]) =>
//       containsStudio(filter.includedStudios, key)
//     )
//   );

//   filterDays(filteredResult, filter.days);

//   return filteredResult;
// }
