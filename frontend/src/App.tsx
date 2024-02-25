import { useState } from "react";
import "./App.css";
import Filter from "./Filter";
import Tables from "./tables";

function App() {
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
  };

  return (
    <>
      <h1>Bodypump Finder</h1>
      <Filter onFilterChange={handleFilterChange}></Filter>

      <Tables filterValue={filterValue}></Tables>
    </>
  );
}

export default App;
