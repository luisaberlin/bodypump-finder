import React, { useState } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

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

type IsMulti = false;

const customStyles: StylesConfig<OptionsType, IsMulti> = {
  container: (provided) => ({
    ...provided,
    marginTop: 10,
  }),
  control: (provided) => ({
    ...provided,
    borderColor: "#594A4E",
    backgroundColor: "#FFFFE",
  }),
  menu: (provided) => ({
    ...provided,
    background: "transparent",
    width: "4em",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    background: "#FAEEE7",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    background: "#FAEEE7",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#594A4E",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#594A4E",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#594A4E",
  }),
};

export interface FilterProps {
  onFilterChange: (studios: string[], days: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStudios, setSelectedStudios] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>(
    dayOptions.map((option) => option.value)
  );

  const handleStudioChange = (newValue: MultiValue<OptionsType>) => {
    if (newValue === null) return;
    const newSelectedStudios = newValue.map((el) => el.value);
    setSelectedStudios(newSelectedStudios);
    onFilterChange(newSelectedStudios, selectedDays);
  };

  const handleDayChange = (newValue: MultiValue<OptionsType>) => {
    if (newValue === null) return;
    const newSelectedDays = newValue.map((el) => el.value);
    setSelectedDays(newSelectedDays);
    onFilterChange(selectedStudios, newSelectedDays);
  };

  return (
    <div className="filter">
      <div>
        <Select
          isMulti
          name="studios"
          options={studioOptions}
          placeholder="Studios..."
          onChange={(newValue: MultiValue<OptionsType>) =>
            handleStudioChange(newValue)
          }
          styles={customStyles}
        />
      </div>
      <div>
        <Select
          isMulti
          name="days"
          options={dayOptions}
          defaultValue={dayOptions}
          placeholder="Days..."
          onChange={(newValue: MultiValue<OptionsType>) =>
            handleDayChange(newValue)
          }
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default Filter;
