import { useState } from "react";
import "./css/App.css";
import Filter from "./Filter";
import Tables from "./tables";

function App() {
  const [filteredStudios, setFilteredStudios] = useState<string[]>([]);
  const [filteredDays, setFilteredDays] = useState<string[]>([]);

  const handleFilterChange = (studios: string[], days: string[]) => {
    setFilteredStudios(studios);
    setFilteredDays(days);
  };

  return (
    <>
      <h1>Bodypump Finder</h1>
      <Filter onFilterChange={handleFilterChange}></Filter>

      <Tables
        filteredStudios={filteredStudios}
        filteredDays={filteredDays}
      ></Tables>
    </>
  );
}

export default App;
