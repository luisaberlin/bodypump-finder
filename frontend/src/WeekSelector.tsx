import { useState } from "react";
import "./css/WeekSelector.css";
import { weekOptions } from "./utils/constants";

interface WeekToggle {
  onWeekSelectorChange: (option: string) => void;
}

const WeekSelector: React.FC<WeekToggle> = ({ onWeekSelectorChange }) => {
  const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]);

  const handleWeekSelectorChange = (option: string) => {
    setSelectedWeek(option);
    onWeekSelectorChange(option);
  };

  return (
    <div className="weekSelector">
      <button
        className={selectedWeek === weekOptions[0] ? "active" : "inactive"}
        onClick={() => handleWeekSelectorChange(weekOptions[0])}
      >
        {weekOptions[0]}
      </button>
      <button
        className={selectedWeek === weekOptions[1] ? "active" : "inactive"}
        onClick={() => handleWeekSelectorChange(weekOptions[1])}
      >
        {weekOptions[1]}
      </button>
    </div>
  );
};

export default WeekSelector;
