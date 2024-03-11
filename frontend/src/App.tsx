import { useEffect, useState } from "react";
import "./css/App.css";
import Filter from "./Filter";
import WeekSelector from "./WeekSelector";
import { GymData, weekOptions } from "./utils/definitions";
import Schedule from "./Schedule";

const url = import.meta.env.VITE_API_URL;

interface ISources {
  name: string;
  url: string;
}

interface GymDataCache {
  data: GymData;
  timestamp: number;
}

interface SourcesCache {
  data: ISources[];
  timestamp: number;
}

const COURSES_CACHE_KEY = "this-week-courses";
const NEXT_COURSES_CACHE_KEY = "next-week-courses";
const CACHE_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

const SOURCES_CACHE_KEY = "sources";
const SOURCES_CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day

function App() {
  const [filteredStudios, setFilteredStudios] = useState<string[]>([]);
  const [filteredDays, setFilteredDays] = useState<string[]>([]);
  const [sources, setSources] = useState<ISources[]>([{ name: "", url: "" }]);
  const [courses, setCourses] = useState<GymData>({});
  const [nextCourses, setNextCourses] = useState<GymData>({});
  const [isLoading, setIsLoading] = useState(true);
  const [week, setWeek] = useState<string>(weekOptions[0]);

  const fetchData = async (
    url: string,
    cacheKey: string,
    setter:
      | React.Dispatch<React.SetStateAction<GymData>>
      | React.Dispatch<React.SetStateAction<ISources[]>>,
    weekOption: number | undefined
  ) => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      setter(jsonData);
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: jsonData, timestamp: new Date().getTime() })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (typeof weekOption === "number" && week === weekOptions[weekOption])
        setIsLoading(false);
    }
  };

  useEffect(() => {
    const cachedSources = localStorage.getItem(SOURCES_CACHE_KEY);
    if (cachedSources) {
      const { timestamp, data } = JSON.parse(cachedSources) as SourcesCache;
      const now = new Date().getTime();
      if (now - timestamp < SOURCES_CACHE_EXPIRATION_TIME) {
        setSources(data);
        return;
      }
    }

    fetchData(`${url}/api/sources`, SOURCES_CACHE_KEY, setSources, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCachedCourses = (
    cachedCourses: string,
    week: string,
    weekOption: number
  ) => {
    const { timestamp, data } = JSON.parse(cachedCourses) as GymDataCache;

    const now = new Date().getTime();
    if (now - timestamp < CACHE_EXPIRATION_TIME) {
      weekOption === 0 ? setCourses(data) : setNextCourses(data);
      if (week === weekOptions[weekOption]) setIsLoading(false);
      return { isCacheExpired: true };
    }
    return { isCacheExpired: false };
  };

  useEffect(() => {
    if (week === weekOptions[0]) setIsLoading(true);

    const cachedCourses = localStorage.getItem(COURSES_CACHE_KEY);
    if (cachedCourses) {
      const { isCacheExpired } = handleCachedCourses(cachedCourses, week, 0);
      if (isCacheExpired) return;
    }

    const date = new Date().toISOString();

    fetchData(`${url}/api?date=${date}`, COURSES_CACHE_KEY, setCourses, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

  useEffect(() => {
    if (week === weekOptions[1]) setIsLoading(true);

    const cachedCourses = localStorage.getItem(NEXT_COURSES_CACHE_KEY);
    if (cachedCourses) {
      const { isCacheExpired } = handleCachedCourses(cachedCourses, week, 1);
      if (isCacheExpired) return;
    }

    const date = new Date();
    date.setDate(date.getDate() + 7);

    fetchData(
      `${url}/api?date=${date.toISOString()}`,
      NEXT_COURSES_CACHE_KEY,
      setNextCourses,
      1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week]);

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
        onWeekSelectorChange={(option: string) => {
          setWeek(option);
        }}
      ></WeekSelector>

      <div>
        {isLoading ? (
          <div className="loading">Loading Bodypump courses...</div>
        ) : (
          <div>
            <Filter
              onFilterChange={(studios: string[], days: string[]) => {
                setFilteredStudios(studios);
                setFilteredDays(days);
              }}
            ></Filter>
          </div>
        )}
      </div>

      <Schedule
        filteredStudios={filteredStudios}
        filteredDays={filteredDays}
        courses={week === weekOptions[0] ? courses : nextCourses}
      ></Schedule>

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
