import { useEffect, useState } from "react";
import "./css/App.css";
import Filter from "./Filter";
import Tables from "./tables";

// export const serverUrl = "http://localhost:3000";
export const serverUrl = "https://bodypump-finder.onrender.com";

interface ISources {
  name: string;
  url: string;
}

function App() {
  const [filteredStudios, setFilteredStudios] = useState<string[]>([]);
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [sources, setSources] = useState<ISources[]>([{ name: "", url: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`request: GET ${serverUrl}/api/sources`);
        const response = await fetch(`${serverUrl}/api/sources`);
        const jsonData = await response.json();
        setSources(jsonData as unknown as ISources[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleFilterChange = (studios: string[], days: string[]) => {
    setFilteredStudios(studios);
    setFilteredDays(days);
  };

  return (
    <div className="app">
      <h1>Bodypump Finder 🏋️‍♀️</h1>
      <p>
        Welcome to the Bodypump Finder! Here, you can find Bodypump courses
        offered by selected HolmesPlace studios in Berlin. This data will be
        gathered by scraping it from eversports.de. You'll find the sources for
        the shown data on the bottom of this page.
      </p>
      <Filter onFilterChange={handleFilterChange}></Filter>

      <Tables
        filteredStudios={filteredStudios}
        filteredDays={filteredDays}
      ></Tables>

      <div className="sources">
        <h3>Sources:</h3>
        {sources.map(function (source, idx) {
          return (
            <li key={idx}>
              <a href={source.url}>{source.name}</a>
            </li>
          );
        })}
      </div>
    </div>
  );
}

export default App;
