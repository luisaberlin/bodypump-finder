import React from "react";
import StudioSchedule from "./studioSchedule";
import "./css/Tables.css";
import { GymData } from "./App";

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
                <StudioSchedule
                  key={studio}
                  studio={studio}
                  courses={data[studio][+dayIndex]}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

interface TableProps {
  courses: GymData;
  filteredStudios: string[];
  filteredDays: string[];
}

const Tables: React.FC<TableProps> = ({
  filteredStudios,
  filteredDays,
  courses,
}) => {
  return (
    <Schedule
      data={courses}
      filteredStudios={filteredStudios}
      filteredDays={filteredDays}
    />
  );
};

export default Tables;
