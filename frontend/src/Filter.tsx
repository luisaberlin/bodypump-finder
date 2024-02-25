import React, { useState } from "react";

interface FilterProps {
  onFilterChange: (studios: string[], days: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleStudiosChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedStudios(selectedOptions);
  };

  const handleDaysChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedDays(selectedOptions);
  };

  const handleFilterApply = () => {
    onFilterChange(selectedStudios, selectedDays);
  };

  return (
    <div>
      <div>
        <label htmlFor="studios">Select Studios:</label>
        <select id="studios" multiple onChange={handleStudiosChange}>
          <option value="Potsdamerplatz">Potsdamerplatz</option>
          <option value="Gendarmenmarkt">Gendarmenmarkt</option>
          <option value="Bismarckstraße">Bismarckstraße</option>
          <option value="Ostkreuz">Ostkreuz</option>
        </select>
      </div>
      <div>
        <label htmlFor="days">Select Days:</label>
        <select id="days" multiple onChange={handleDaysChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <button onClick={handleFilterApply}>Apply Filter</button>
    </div>
  );
};

export default Filter;
