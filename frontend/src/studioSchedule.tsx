import React from "react";
import { Course } from "./tables";

const StudioSchedule: React.FC<{ studio: string; courses: Course[] }> = ({
  studio,
  courses,
}) => {
  return (
    <div key={studio}>
      <h3>{studio}</h3>
      <table>
        <tbody>
          {courses.length > 0 ? (
            courses.map((course: Course, index: number) => (
              <tr key={index}>
                <td>{course.time}</td>
                <td>{course.availability}</td>
                <td>{course.trainer}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No courses</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudioSchedule;
