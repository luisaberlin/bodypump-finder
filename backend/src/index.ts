import { buildApi } from "./api/api";

const port = 3000;

// export const filter: IFilter = {
//   includedStudios: [
//     StudioNames.GENDARMENMARKT,
//     StudioNames.POTSDAMERPLATZ,
//     StudioNames.BISMARCKSTRAßE,
//     // Studios.OSTKREUZ,
//   ],
//   days: [
//     // 0, // Monday
//     // 1, // Tuesday
//     2, // Wednesday
//     3, // Thursday
//     // 4, // Friday
//     // 5, // Saturday
//     // 6, // Sunday
//   ],
// };

const api = buildApi();
api.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
