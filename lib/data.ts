export interface Task {
  id: string;
  name: string;
  points: number;
  completed: boolean; // For daily check-in
  type: "daily-check-in" | "regular"; // New: type of task
  status?: "pending" | "approved" | "rejected"; // New: for regular tasks
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  redeemed: boolean;
}

export interface UserData {
  name: string;
  progress: number;
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
  rank: "Silver",
  tasks: [
    // Daily Check-In
    {
      id: "t1",
      name: "Daily Check-In",
      points: 10,
      completed: false,
      type: "daily-check-in",
    },
    // Regular Tasks (start as undefined status)
    {
      id: "t2",
      name: "Complete Math Homework",
      points: 20,
      completed: false,
      type: "regular",
      status: undefined,
    },
    {
      id: "t3",
      name: "Read a Book for 30 Mins",
      points: 15,
      completed: false,
      type: "regular",
      status: undefined,
    },
    {
      id: "t4",
      name: "Practice Speaking English",
      points: 8,
      completed: false,
      type: "regular",
      status: undefined,
    },
    {
      id: "t5",
      name: "Clean Your Room",
      points: 25,
      completed: false,
      type: "regular",
      status: undefined,
    },
  ],
  rewards: [
    {
      id: "r1",
      name: "Extra Screen Time (30 min)",
      pointsRequired: 200,
      redeemed: false,
    },
    { id: "r2", name: "Favorite Snack", pointsRequired: 300, redeemed: false },
    {
      id: "r3",
      name: "New Sticker Pack",
      pointsRequired: 400,
      redeemed: false,
    },
  ],
};
