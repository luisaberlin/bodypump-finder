function getDate(date: Date, wantedDayIndex: number) {
  // Monday = 1, Tuesday = 2, ... Sunday = 0
  const dayIndex = date.getDay();

  // Monday = 0, Tuesday = 1, ... Sunday = 6
  const correctedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  const dateIndex = date.getDate() - correctedDayIndex + wantedDayIndex;

  return new Date(date.setDate(dateIndex)).toISOString().slice(0, 10);
}

export function getMondayAndSunday() {
  const today = new Date();

  const monday = getDate(today, 0);
  const sunday = getDate(today, 6);

  const mondayFormetted = monday.split("-").reverse().join("/");
  const sundayFormetted = sunday.split("-").reverse().join("/");

  return { mondayFormetted, sundayFormetted };
}
