function getDate(date: Date, wantedDayIndex: number) {
  // Monday = 1, Tuesday = 2, ... Sunday = 0
  const dayIndex = date.getDay();

  // Monday = 0, Tuesday = 1, ... Sunday = 6
  const correctedDayIndex = dayIndex === 0 ? 6 : dayIndex - 1;

  const dateIndex = date.getDate() - correctedDayIndex + wantedDayIndex;

  return new Date(date.setDate(dateIndex)).toISOString().slice(0, 10);
}

export function getStartDate(dateStr: string) {
  const date = new Date(dateStr);
  console.log(date);

  const monday = getDate(date, 0);
  //   const sunday = getDate(today, 6);

  return monday;
}
