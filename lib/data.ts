export interface Task {
  id: string;
  name: string;
  points: number;
  completed: boolean;
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  redeemed: boolean;
}

export interface UserData {
  name: string;
  progress: number; // For the progress bar (e.g., 97%)
  weeks: number;
  totalPoints: number;
  rank: string;
  tasks: Task[];
  rewards: Reward[];
}

export const mockUserData: UserData = {
  name: "John",
  progress: 97,
  weeks: 10,
  totalPoints: 250,
  rank: "Silver", // Matching your image, previously Gold
  tasks: [
    { id: "t1", name: "Daily Check-In", points: 10, completed: true },
    { id: "t2", name: "Task 1", points: 10, completed: false },
    { id: "t3", name: "Task 2", points: 5, completed: false },
    { id: "t4", name: "Task 3", points: 8, completed: false },
  ],
  rewards: [
    { id: "r1", name: "Reward 1", pointsRequired: 200, redeemed: false },
    { id: "r2", name: "Reward 2", pointsRequired: 300, redeemed: false },
    { id: "r3", name: "Reward 3", pointsRequired: 400, redeemed: false },
  ],
};
