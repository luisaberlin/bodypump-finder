import React, { useState } from "react";

enum StudioName {
  POTSDAMERPLATZ = "Potsdamerplatz",
  GENDARMENMARKT = "Gendarmenmarkt",
  BISMARCKSTRAßE = "Bismarckstraße",
  OSTKREUZ = "Ostkreuz",
}

export interface FilterProps {
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
          <option value={StudioName.POTSDAMERPLATZ}>
            {StudioName.POTSDAMERPLATZ}
          </option>
          <option value={StudioName.GENDARMENMARKT}>
            {StudioName.GENDARMENMARKT}
          </option>
          <option value={StudioName.BISMARCKSTRAßE}>
            {StudioName.BISMARCKSTRAßE}
          </option>
          <option value={StudioName.OSTKREUZ}>{StudioName.OSTKREUZ}</option>
        </select>
      </div>
      <div>
        <label htmlFor="days">Select Days:</label>
        <select id="days" multiple onChange={handleDaysChange}>
          <option value="0">Monday</option>
          <option value="1">Tuesday</option>
          <option value="2">Wednesday</option>
          <option value="3">Thursday</option>
          <option value="4">Friday</option>
          <option value="5">Saturday</option>
          <option value="6">Sunday</option>
        </select>
      </div>
      <button onClick={handleFilterApply}>Apply Filter</button>
    </div>
  );
};

export default Filter;
