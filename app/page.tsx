"use client";

import { useState } from "react";
// Import Lucide Icons
import {
  Settings,
  Home as HomeIcon,
  ClipboardCheck,
  Trophy,
  Gift,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockUserData, Task, Reward } from "@/lib/data";

// --- Components for different sections (These remain the same) ---

const HomeSection = ({ userData }: { userData: typeof mockUserData }) => (
  <div className="p-4 sm:p-6 md:p-8">
    {/* Header with Settings Icon - Only visible on mobile/small screens, hidden by md:hidden */}
    <div className="flex justify-between items-center mb-6 md:hidden">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Hi, {userData.name}
      </h1>
      <Button
        variant="ghost"
        size="icon"
        className="text-gray-600 hover:text-gray-900"
      >
        <Settings className="h-6 w-6" />
      </Button>
    </div>

    <Card className="mb-6 shadow-md rounded-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          Progress ({userData.progress}%)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Progress
          value={userData.progress}
          className="w-full h-3 bg-gray-200"
        />
      </CardContent>
    </Card>

    <Card className="shadow-md rounded-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl sm:text-2xl font-semibold">
          This Week
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {userData.weeks}
          </p>
          <p className="text-sm text-gray-500">Weeks</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {userData.totalPoints}
          </p>
          <p className="text-sm text-gray-500">Points</p>
        </div>
        <div>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600">
            {userData.rank}
          </p>
          <p className="text-sm text-gray-500">Rank</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

const TasksSection = ({
  tasks,
  onToggleTask,
}: {
  tasks: Task[];
  onToggleTask: (id: string) => void;
}) => (
  <div className="p-4 sm:p-6 md:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Tasks</h2>
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card
          key={task.id}
          className="flex items-center justify-between p-4 shadow-sm rounded-lg"
        >
          <label
            htmlFor={`task-${task.id}`}
            className="flex items-center space-x-3 cursor-pointer flex-grow"
          >
            <Checkbox
              id={`task-${task.id}`}
              checked={task.completed}
              onCheckedChange={() => onToggleTask(task.id)}
              className="w-5 h-5"
            />
            <span
              className={`text-base sm:text-lg font-medium ${
                task.completed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {task.name}
            </span>
          </label>
          <span className="text-sm sm:text-base text-blue-600 font-semibold">
            {task.points} P
          </span>
        </Card>
      ))}
    </div>
  </div>
);

const RankPromotionSection = ({ rank }: { rank: string }) => (
  <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
      Rank Promotion
    </h2>
    <div className="w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-lg mb-8 p-4">
      <Trophy className="w-24 h-24 sm:w-32 sm:h-32 text-white drop-shadow-md" />
    </div>
    <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6">
      Your Current Rank:
    </p>
    <p className="text-4xl sm:text-5xl font-extrabold text-purple-700 uppercase mb-8">
      {rank}
    </p>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-xs py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-lg">
          CLAIM
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Rank Information
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700">
          Congratulations! You are currently a **{rank}** rank student!
        </p>
        <p className="text-gray-700">
          Keep earning points to achieve higher ranks and unlock exclusive
          rewards.
        </p>
      </DialogContent>
    </Dialog>
  </div>
);

const RewardsSection = ({
  rewards,
  totalPoints,
  onRedeemReward,
}: {
  rewards: Reward[];
  totalPoints: number;
  onRedeemReward: (id: string) => void;
}) => (
  <div className="p-4 sm:p-6 md:p-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
      Rewards
    </h2>
    <p className="mb-6 text-xl font-semibold text-blue-600">
      Your Current Points: {totalPoints}
    </p>
    <div className="space-y-4">
      {rewards.map((reward) => (
        <Card
          key={reward.id}
          className="flex items-center justify-between p-4 shadow-sm rounded-lg"
        >
          <label
            htmlFor={`reward-${reward.id}`}
            className="flex items-center space-x-3 cursor-pointer flex-grow"
          >
            <Checkbox
              id={`reward-${reward.id}`}
              checked={reward.redeemed}
              disabled={reward.redeemed || totalPoints < reward.pointsRequired}
              onCheckedChange={() => onRedeemReward(reward.id)}
              className="w-5 h-5"
            />
            <span
              className={`text-base sm:text-lg font-medium ${
                reward.redeemed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {reward.name}
            </span>
          </label>
          <span className="text-sm sm:text-base text-red-600 font-semibold">
            {reward.pointsRequired} pts
          </span>
        </Card>
      ))}
    </div>
  </div>
);

// --- Main App Component ---

type ActiveTab = "home" | "tasks" | "rank" | "rewards";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [userData, setUserData] = useState(mockUserData);

  const handleToggleTask = (id: string) => {
    setUserData((prevData) => {
      const updatedTasks = prevData.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // Simulate earning points for completing a task
      const completedTask = updatedTasks.find(
        (t) =>
          t.id === id &&
          t.completed !== prevData.tasks.find((ot) => ot.id === id)?.completed
      );
      const newTotalPoints =
        completedTask && completedTask.completed
          ? prevData.totalPoints + completedTask.points
          : prevData.totalPoints;

      return {
        ...prevData,
        tasks: updatedTasks,
        totalPoints: newTotalPoints,
      };
    });
  };

  const handleRedeemReward = (id: string) => {
    setUserData((prevData) => {
      const rewardToRedeem = prevData.rewards.find((r) => r.id === id);
      if (
        rewardToRedeem &&
        prevData.totalPoints >= rewardToRedeem.pointsRequired &&
        !rewardToRedeem.redeemed
      ) {
        return {
          ...prevData,
          totalPoints: prevData.totalPoints - rewardToRedeem.pointsRequired,
          rewards: prevData.rewards.map((reward) =>
            reward.id === id ? { ...reward, redeemed: true } : reward
          ),
        };
      }
      return prevData;
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {" "}
      {/* Use flex-row for desktop layout */}
      {/* Basic Sidebar for Larger Screens (Desktop/Tablet) */}
      <nav className="fixed left-0 top-0 h-full w-20 bg-white border-r shadow-lg hidden md:flex flex-col items-center py-8 z-10">
        {/* Settings icon at the very top of sidebar on desktop */}
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900 mb-8"
        >
          <Settings className="h-7 w-7" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center py-3 mb-4 text-sm ${
            activeTab === "home" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <HomeIcon className="h-7 w-7 mb-1" />
          <span className="text-xs">HOME</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("tasks")}
          className={`flex flex-col items-center py-3 mb-4 text-sm ${
            activeTab === "tasks" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <ClipboardCheck className="h-7 w-7 mb-1" />
          <span className="text-xs">TASKS</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("rank")}
          className={`flex flex-col items-center py-3 mb-4 text-sm ${
            activeTab === "rank" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Trophy className="h-7 w-7 mb-1" />
          <span className="text-xs">RANK</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("rewards")}
          className={`flex flex-col items-center py-3 mb-4 text-sm ${
            activeTab === "rewards"
              ? "text-blue-600 font-bold"
              : "text-gray-500"
          }`}
        >
          <Gift className="h-7 w-7 mb-1" />
          <span className="text-xs">REWARDS</span>
        </Button>
      </nav>
      {/* Main Content Area - This will only render once */}
      <main className="flex-grow pb-16 md:pb-0 md:ml-20">
        {" "}
        {/* Add margin-left for sidebar on md+ screens */}
        {activeTab === "home" && <HomeSection userData={userData} />}
        {activeTab === "tasks" && (
          <TasksSection
            tasks={userData.tasks}
            onToggleTask={handleToggleTask}
          />
        )}
        {activeTab === "rank" && <RankPromotionSection rank={userData.rank} />}
        {activeTab === "rewards" && (
          <RewardsSection
            rewards={userData.rewards}
            totalPoints={userData.totalPoints}
            onRedeemReward={handleRedeemReward}
          />
        )}
      </main>
      {/* Bottom Navigation (Mobile Only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around items-center p-2 border-t bg-white shadow-lg md:hidden">
        {" "}
        {/* Hidden on medium+ screens */}
        <Button
          variant="ghost"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center flex-grow py-2 text-sm ${
            activeTab === "home" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <HomeIcon className="h-6 w-6 mb-1" />
          <span className="text-xs">HOME</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("tasks")}
          className={`flex flex-col items-center flex-grow py-2 text-sm ${
            activeTab === "tasks" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <ClipboardCheck className="h-6 w-6 mb-1" />
          <span className="text-xs">TASKS</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("rank")}
          className={`flex flex-col items-center flex-grow py-2 text-sm ${
            activeTab === "rank" ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          <Trophy className="h-6 w-6 mb-1" />
          <span className="text-xs">RANK</span>
        </Button>
        <Button
          variant="ghost"
          onClick={() => setActiveTab("rewards")}
          className={`flex flex-col items-center flex-grow py-2 text-sm ${
            activeTab === "rewards"
              ? "text-blue-600 font-bold"
              : "text-gray-500"
          }`}
        >
          <Gift className="h-6 w-6 mb-1" />
          <span className="text-xs">REWARDS</span>
        </Button>
      </nav>
    </div>
  );
}
