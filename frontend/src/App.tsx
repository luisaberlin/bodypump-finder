import { useEffect, useState } from "react";
import "./css/App.css";
import Filter from "./Filter";
import Tables from "./tables";

export const serverUrl = "https://bodypump-finder.onrender.com";

interface ISources {
  name: string;
  url: string;
}

export interface Course {
  time: string;
  trainer: string;
  availability: string;
  //   weekday: string;
  //   sessionName: string;
  //   location: string;
}

export interface GymData {
  [key: string]: Course[][];
}

function App() {
  const [filteredStudios, setFilteredStudios] = useState<string[]>([]);
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [sources, setSources] = useState<ISources[]>([{ name: "", url: "" }]);
  const [courses, setCourses] = useState<GymData>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(`${serverUrl}/api/sources`);
        const response = await fetch(`${serverUrl}/api/sources`);
        const jsonData = await response.json();
        setSources(jsonData as unknown as ISources[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the async function when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverUrl}/api`);
        const jsonData = await response.json();
        setCourses(jsonData as unknown as GymData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
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

      <div>
        {isLoading ? (
          <div className="loading">Fetching Bodypump data...</div>
        ) : (
          <div>
            <Filter onFilterChange={handleFilterChange}></Filter>
          </div>
        )}
      </div>

      <Tables
        filteredStudios={filteredStudios}
        filteredDays={filteredDays}
        courses={courses}
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
