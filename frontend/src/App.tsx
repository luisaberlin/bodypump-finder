import { useEffect, useState } from "react";
import "./css/App.css";
import Filter from "./Filter";
import Tables from "./tables";
// import { getMondayAndSunday } from "./utils/dateUtils";
import WeekSelector, { weekOptions } from "./WeekSelector";

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

interface GymDataCache {
  data: GymData;
  timestamp: number;
}

const COURSES_CACHE_KEY = "courses";
const COURSES_CACHE_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

function App() {
  const [filteredStudios, setFilteredStudios] = useState<string[]>([]);
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [sources, setSources] = useState<ISources[]>([{ name: "", url: "" }]);
  const [courses, setCourses] = useState<GymData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [week, setWeek] = useState<string>(weekOptions[0]);

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
    const cachedCourses = localStorage.getItem(COURSES_CACHE_KEY);
    if (cachedCourses) {
      const { timestamp, data } = JSON.parse(cachedCourses) as GymDataCache;

      const now = new Date().getTime();
      if (now - timestamp < COURSES_CACHE_EXPIRATION_TIME) {
        setCourses(data);
        setIsLoading(false);
        return;
      }
    }

    const fetchData = async (week: string) => {
      try {
        // use week
        console.log("selected week:", week);
        const response = await fetch(`${serverUrl}/api`);
        const jsonData = await response.json();
        setCourses(jsonData as unknown as GymData);
        localStorage.setItem(
          COURSES_CACHE_KEY,
          JSON.stringify({ data: jsonData, timestamp: new Date().getTime() })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(week);
  }, [week]);

  const handleWeekSelectorChange = (option: string) => {
    setWeek(option);
  };

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

      <WeekSelector
        onWeekSelectorChange={handleWeekSelectorChange}
      ></WeekSelector>

      {/* <div className="selectedWeek">
        {mondayFormetted} - {sundayFormetted}
      </div> */}
      <div>
        {isLoading ? (
          <div className="loading">Loading Bodypump courses...</div>
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
