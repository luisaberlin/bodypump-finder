// import { IFilter } from "./filterSessions";
// import { IExtendedCourseData } from "./scrapData";

// function logDay(dayIndex: number) {
//   switch (dayIndex) {
//     case 0:
//       console.log("\n\nMonday\n");
//       break;
//     case 1:
//       console.log("\n\nTuesday\n");
//       break;
//     case 2:
//       console.log("\n\nWednesday\n");
//       break;
//     case 3:
//       console.log("\n\nThursday\n");
//       break;
//     case 4:
//       console.log("\n\nFriday\n");
//       break;
//     case 5:
//       console.log("\n\nSaturday\n");
//       break;
//     case 6:
//       console.log("\n\nSunday\n");
//       break;
//   }
// }

// export function logSessions(
//   filteredResult: Map<string, IExtendedCourseData[][]>,
//   filter: IFilter
// ) {
//   for (let dayIndex = 0; dayIndex <= 6; dayIndex++) {
//     if (!filter.days.includes(dayIndex as 0 | 1 | 2 | 3 | 4 | 5 | 6)) continue;

//     logDay(dayIndex);

//     filter.includedStudios.forEach((studioName) => {
//       console.log(`${studioName}:`);

//       const sessionsPerStudio = filteredResult.get(studioName);
//       if (sessionsPerStudio) {
//         const sessionsPerStudioPerDay = sessionsPerStudio[dayIndex];

//         const output = sessionsPerStudioPerDay.map((session) => {
//           return {
//             time: session.time,
//             name: session.sessionName,
//             availability: session.spots,
//             trainer: session.trainer,
//           };
//         });

//         console.table(output);
//       }
//     });
//   }
// }
