import { useState } from "react";
import "./css/WeekSelector.css";

const WeekSelector: React.FC = () => {
  const types = ["This week", "Next week"];
  const [selectedWeek, setSelectedWeek] = useState(types[0]);

  console.log(selectedWeek);

  return (
    <div className="weekSelector">
      <button
        className={selectedWeek === types[0] ? "active" : "inactive"}
        onClick={() => setSelectedWeek(types[0])}
      >
        {types[0]}
      </button>
      <button
        className={selectedWeek === types[1] ? "active" : "inactive"}
        onClick={() => setSelectedWeek(types[1])}
      >
        {types[1]}
      </button>
    </div>
  );
};

export default WeekSelector;
