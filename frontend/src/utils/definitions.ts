export interface Course {
  time: string;
  trainer: string;
  availability: string;
}

export interface GymData {
  [key: string]: Course[][];
}

export const weekOptions = ["This week", "Next week"];
