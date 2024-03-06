import React from "react";
import { GymData } from "./utils/definitions";
import StudioSchedule from "./StudioSchedule";
import "./css/Schedule.css";

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

interface ScheduleProps {
  courses: GymData;
  filteredStudios: string[];
  filteredDays: string[];
}

const Schedule: React.FC<ScheduleProps> = ({
  filteredStudios,
  filteredDays,
  courses,
}) => {
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
                  courses={courses[studio][+dayIndex] ?? []}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
