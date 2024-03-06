import React, { useState } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";
import "./css/Filter.css";

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

type IsMulti = false | true;

const customStyles: StylesConfig<OptionsType, IsMulti> = {
  container: (provided) => ({
    ...provided,
    marginTop: 10,
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: "#594A4E",
    boxShadow: state.isFocused ? "none" : "none",
    backgroundColor: "#FFFFE",
    ":hover": {
      borderColor: "#594A4E",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#faeee7" : "#fffffe",
    ":hover": {
      backgroundColor: "#faeee7",
    },
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    background: "#FAEEE7",
    fontSize: 12,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    background: "#FAEEE7",
    ":hover": {
      backgroundColor: "#faeee7",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: "#594A4E",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#594A4E",
    ":hover": {
      color: "#594A4E",
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: "#594A4E",
    ":hover": {
      color: "#594A4E",
    },
  }),
};

interface FilterProps {
  onFilterChange: (studios: string[], days: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [selectedStudios, setSelectedStudios] = useState<string[]>(
    studioOptions.map((option) => option.value)
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    dayOptions.map((option) => option.value)
  );

  const handleStudioChange = (newValue: MultiValue<OptionsType>) => {
    if (newValue === null) return;

    const newSelectedStudios = newValue.map((el) => el.value);
    const defaultStudioValues = studioOptions.map((el) => el.value);

    const newSelectionValue =
      newValue.length > 0 ? newSelectedStudios : defaultStudioValues;

    setSelectedStudios(newSelectionValue);
    onFilterChange(newSelectionValue, selectedDays);
  };

  const handleDayChange = (newValue: MultiValue<OptionsType>) => {
    if (newValue === null) return;

    console.log("day index:", newValue);

    const sortedNewValue = (newValue as unknown as OptionsType[]).sort(
      (a, b) => {
        return parseInt(a.value) - parseInt(b.value);
      }
    );

    const newSelectedDays = sortedNewValue.map((el) => el.value);
    const defaultDayValues = dayOptions.map((el) => el.value);

    const newSelectionValue =
      newValue.length > 0 ? newSelectedDays : defaultDayValues;

    setSelectedDays(newSelectionValue);
    onFilterChange(selectedStudios, newSelectionValue);
  };

  return (
    <div className="filter">
      <div className="studio-filter">
        <Select
          isMulti
          name="studios"
          options={studioOptions}
          placeholder="Select studios..."
          onChange={(newValue: MultiValue<OptionsType>) =>
            handleStudioChange(newValue)
          }
          styles={customStyles}
        />
      </div>
      <div className="day-filter">
        <Select
          isMulti
          name="days"
          options={dayOptions}
          // defaultValue={dayOptions}
          placeholder="Select days..."
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
