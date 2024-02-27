import React, { useEffect, useState } from "react";
import StudioSchedule from "./studioSchedule";
import "./css/Tables.css";

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
  filteredStudios: string[];
  filteredDays: string[];
}

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

const Schedule: React.FC<Props> = ({ data, filteredStudios, filteredDays }) => {
  return (
    <div>
      {filteredDays.map((dayIndex: string) => (
        <div key={getDayName(+dayIndex)}>
          <h2>{getDayName(+dayIndex)}</h2>

          {filteredStudios.map((studio: string) => {
            return (
              <div key={studio}>
                {data[studio] ? (
                  <StudioSchedule
                    key={studio}
                    studio={studio}
                    courses={data[studio][+dayIndex]}
                  />
                ) : (
                  "No courses"
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

interface TableProps {
  filteredStudios: string[];
  filteredDays: string[];
}

const Tables: React.FC<TableProps> = ({ filteredStudios, filteredDays }) => {
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

  return (
    <Schedule
      data={data}
      filteredStudios={filteredStudios}
      filteredDays={filteredDays}
    />
  );
};

export default Tables;
