import React, { useState } from "react";
import Select, { MultiValue } from "react-select";

enum StudioName {
  POTSDAMERPLATZ = "Potsdamerplatz",
  GENDARMENMARKT = "Gendarmenmarkt",
  BISMARCKSTRAßE = "Bismarckstraße",
  OSTKREUZ = "Ostkreuz",
}

type OptionsType = { label: string; value: string };

const studioOptions: OptionsType[] = [
  { value: StudioName.BISMARCKSTRAßE, label: StudioName.BISMARCKSTRAßE },
  { value: StudioName.GENDARMENMARKT, label: StudioName.GENDARMENMARKT },
  { value: StudioName.OSTKREUZ, label: StudioName.OSTKREUZ },
  { value: StudioName.POTSDAMERPLATZ, label: StudioName.POTSDAMERPLATZ },
];

const dayOptions: OptionsType[] = [
  { value: "0", label: "Monday" },
  { value: "1", label: "Tuesday" },
  { value: "2", label: "Wednesday" },
  { value: "3", label: "Thursday" },
  { value: "4", label: "Friday" },
  { value: "5", label: "Saturday" },
  { value: "6", label: "Sunday" },
];

export interface FilterProps {
  onFilterChange: (studios: string[], days: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleFilterApply = () => {
    onFilterChange(selectedStudios, selectedDays);
  };

  return (
    <div>
      <div>
        <Select
          isMulti
          name="studios"
          options={studioOptions}
          placeholder="Studios..."
          onChange={(newValue: MultiValue<OptionsType>) => {
            if (newValue === null) return;
            setSelectedStudios(newValue.map((el) => el.value));
          }}
        />
      </div>
      <div>
        <Select
          isMulti
          name="days"
          options={dayOptions}
          placeholder="Days..."
          onChange={(newValue: MultiValue<OptionsType>) => {
            if (newValue === null) return;
            setSelectedDays(newValue.map((el) => el.value));
          }}
        />
      </div>
      <button onClick={handleFilterApply}>Apply Filter</button>
    </div>
  );
};

export default Filter;
