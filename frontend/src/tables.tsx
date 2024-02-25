import React, { useEffect, useState } from "react";
import StudioSchedule from "./studioSchedule";

enum StudioNames {
  POTSDAMERPLATZ = "Potsdamerplatz",
  GENDARMENMARKT = "Gendarmenmarkt",
  BISMARCKSTRAßE = "Bismarckstraße",
  OSTKREUZ = "Ostkreuz",
}

interface IFilter {
  includedStudios: Array<StudioNames>;
  days: Array<0 | 1 | 2 | 3 | 4 | 5 | 6>;
}

export interface Course {
  time: string;
  trainer: string;
  availability: string;
  //   weekday: string;
  //   sessionName: string;
  //   location: string;
}

interface GymData {
  [key: string]: Course[][];
}

interface Props {
  data: GymData;
  filter: IFilter;
}

const Schedule: React.FC<Props> = ({ data, filter }) => {
  return (
    <div>
      {filter.days.map((dayIndex: number) => (
        <div key={getDayName(dayIndex)}>
          <h2>{getDayName(dayIndex)}</h2>

          {filter.includedStudios.map((studio: string) => {
            return (
              <div key={studio}>
                {data[studio] ? (
                  <StudioSchedule
                    key={studio}
                    studio={studio}
                    courses={data[studio][dayIndex]}
                  />
                ) : (
                  "No data"
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

function getDayName(index: number): string {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[index];
}

const filter: IFilter = {
  includedStudios: [
    StudioNames.GENDARMENMARKT,
    StudioNames.POTSDAMERPLATZ,
    StudioNames.BISMARCKSTRAßE,
    // Studios.OSTKREUZ,
  ],
  days: [
    // 0, // Monday
    // 1, // Tuesday
    2, // Wednesday
    3, // Thursday
    // 4, // Friday
    // 5, // Saturday
    // 6, // Sunday
  ],
};

interface TableProps {
  filterValue: string;
}

// Example usage:
const Tables: React.FC<TableProps> = ({ filterValue }) => {
  const [data, setData] = useState<GymData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api");
        const jsonData = await response.json();
        setData(jsonData as unknown as GymData); // Update state with fetched data

        console.log(jsonData as unknown as GymData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return <Schedule data={data} filter={filter} />;
};

export default Tables;
