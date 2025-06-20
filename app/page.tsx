"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // <--- Add this line!
// Import additional Lucide Icons for more meaning
import {
  Settings,
  Home as HomeIcon,
  ClipboardCheck,
  Trophy,
  Gift,
  Gauge, // For progress
  Calendar, // For weeks
  Sparkles, // For points
  Award, // For rank
  CheckCircle, // For completed tasks
  DollarSign, // For rewards cost
  Coins, // Another option for points
  Loader2, // For loading spinner (pending approval)
  XCircle, // For rejected tasks
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

// --- Components for different sections ---
// --- New Redeemed Rewards Section Component ---
const RedeemedRewardsSection = ({ rewards }: { rewards: Reward[] }) => {
  const redeemedRewards = rewards.filter((reward) => reward.redeemed);

  return (
    <div className="py-4 sm:py-6 md:py-8">
      {" "}
      {/* Outer padding for the entire section */}
      {/* Section Header - Styled to match other CardHeaders */}
      <Card className="mb-6 shadow-lg rounded-xl border border-gray-100 transition-transform duration-200 hover:scale-[1.01]">
        <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />{" "}
            {/* Icon for the header */}
            Redeemed Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          {redeemedRewards.length === 0 ? (
            // Empty State Card - Nicer and more aligned with existing designs
            <div className="flex flex-col items-center justify-center p-6 text-center bg-gray-50 rounded-lg border border-gray-100">
              <Gift className="w-12 h-12 text-gray-400 mb-4" />{" "}
              {/* Icon for empty state */}
              <p className="text-gray-600 text-lg font-medium mb-2">
                No rewards redeemed yet.
              </p>
              <p className="text-sm text-gray-500">
                Keep completing tasks to earn points and claim your first
                reward!
              </p>
            </div>
          ) : (
            // Redeemed Rewards List
            <div className="space-y-4">
              {redeemedRewards.map((reward) => (
                <Card
                  key={reward.id}
                  className="flex items-center justify-between p-4 shadow-sm rounded-lg border border-green-300 bg-green-50 transition-transform duration-200 hover:scale-[1.005] hover:shadow-md"
                >
                  <div className="flex items-center space-x-3">
                    <Gift className="w-7 h-7 text-green-600" />{" "}
                    {/* Icon for each redeemed reward */}
                    <span className="text-base sm:text-lg font-semibold text-gray-800">
                      {reward.name}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base text-green-700 font-bold flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" /> Redeemed!
                  </span>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

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

    {/* Progress Card - Enhanced with Icon */}
    <Card className="mb-6 shadow-lg rounded-xl border border-gray-100 transition-transform duration-200 hover:scale-[1.01]">
      <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center">
          <Gauge className="w-6 h-6 mr-2 text-blue-500" />
          Progress
        </CardTitle>
        <span className="text-xl font-bold text-blue-600">
          {userData.progress}%
        </span>
      </CardHeader>
      <CardContent>
        <Progress
          value={userData.progress}
          className="w-full h-3 bg-blue-100"
          indicatorClassName="bg-blue-500"
        />
        <p className="text-sm text-gray-500 mt-2">Keep up the great work!</p>
      </CardContent>
    </Card>

    {/* This Week Card - Enhanced with Icons and clearer layout */}
    <Card className="shadow-lg rounded-xl border border-gray-100 transition-transform duration-200 hover:scale-[1.01]">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-800">
          This Week&apos;s Snapshot
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-3 gap-4 text-center">
        {/* Weeks */}
        <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
          <Calendar className="w-8 h-8 text-blue-600 mb-2" />
          <p className="text-2xl sm:text-3xl font-bold text-blue-700">
            {userData.weeks}
          </p>
          <p className="text-sm text-gray-600">Weeks</p>
        </div>
        {/* Points */}
        <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
          <Sparkles className="w-8 h-8 text-green-600 mb-2" />
          <p className="text-2xl sm:text-3xl font-bold text-green-700">
            {userData.totalPoints}
          </p>
          <p className="text-sm text-gray-600">Points</p>
        </div>
        {/* Rank */}
        <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
          <Award className="w-8 h-8 text-purple-600 mb-2" />
          <p className="text-2xl sm:text-3xl font-bold text-purple-700">
            {userData.rank}
          </p>
          <p className="text-sm text-gray-600">Rank</p>
        </div>
      </CardContent>
    </Card>

    {/* New Redeemed Rewards Section */}
    <RedeemedRewardsSection rewards={userData.rewards} />
  </div>
);

const TasksSection = ({
  tasks,
  onToggleTask,
}: {
  tasks: Task[];
  onToggleTask: (id: string, type: "daily-check-in" | "regular") => void;
}) => {
  const [dailyCheckInEffect, setDailyCheckInEffect] = useState(false);

  const handleDailyCheckIn = (task: Task) => {
    if (!task.completed) {
      setDailyCheckInEffect(true);
      onToggleTask(task.id, "daily-check-in"); // This will update completed state and points
      setTimeout(() => {
        setDailyCheckInEffect(false); // Reset effect after a short delay
      }, 500); // Effect duration
    }
  };

  const handleSubmitRegularTask = (task: Task) => {
    if (!task.status) {
      // Only if not already submitted
      onToggleTask(task.id, "regular"); // This will set status to 'pending'
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Your Tasks
      </h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={cn(
              "flex items-center justify-between p-4 shadow-sm rounded-lg border transition-all duration-200",
              task.type === "daily-check-in" &&
                dailyCheckInEffect &&
                task.completed
                ? "border-green-500 bg-green-50 shadow-lg"
                : "border-gray-100 hover:shadow-md",
              task.type === "regular" && task.status === "approved"
                ? "border-green-500 bg-green-50"
                : "",
              task.type === "regular" && task.status === "rejected"
                ? "border-red-500 bg-red-50"
                : "",
              task.type === "regular" && task.status === "pending"
                ? "border-blue-300 bg-blue-50"
                : ""
            )}
          >
            <div className="flex items-center space-x-3 flex-grow">
              {task.type === "daily-check-in" ? (
                <>
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleDailyCheckIn(task)}
                    disabled={task.completed} // Cannot uncheck
                    className="w-5 h-5 border-2 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white"
                  />
                  <span
                    className={`text-base sm:text-lg font-medium flex items-center ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    }`}
                  >
                    {task.completed ? (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    ) : (
                      <ClipboardCheck className="w-5 h-5 mr-2 text-gray-500" />
                    )}
                    {task.name}
                  </span>
                </>
              ) : (
                // Regular Task
                <>
                  <span
                    className={`text-base sm:text-lg font-medium flex items-center ${
                      task.status ? "text-gray-500" : "text-gray-700"
                    }`}
                  >
                    {task.status === "approved" && (
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    )}
                    {task.status === "rejected" && (
                      <XCircle className="w-5 h-5 mr-2 text-red-500" />
                    )}
                    {task.status === "pending" && (
                      <Loader2 className="w-5 h-5 mr-2 text-blue-500 animate-spin" />
                    )}
                    {!task.status && (
                      <ClipboardCheck className="w-5 h-5 mr-2 text-gray-500" />
                    )}
                    {task.name}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm sm:text-base text-blue-600 font-semibold">
                {task.points} Pts
              </span>
              {task.type === "regular" && !task.status && (
                <Button
                  size="sm"
                  onClick={() => handleSubmitRegularTask(task)}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                >
                  Submit
                </Button>
              )}
              {task.type === "regular" && task.status === "pending" && (
                <span className="text-sm text-blue-500 font-medium">
                  Pending...
                </span>
              )}
              {task.type === "regular" && task.status === "approved" && (
                <span className="text-sm text-green-600 font-medium">
                  Approved
                </span>
              )}
              {task.type === "regular" && task.status === "rejected" && (
                <span className="text-sm text-red-600 font-medium">
                  Rejected
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const RankPromotionSection = ({ rank }: { rank: string }) => (
  <div className="p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
      Rank Progression
    </h2>
    {/* Enhanced Rank Icon/Display */}
    <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full shadow-xl mb-8 p-4 border-4 border-yellow-200">
      <Trophy className="w-32 h-32 sm:w-40 sm:h-40 text-white drop-shadow-md" />
    </div>
    <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
      Your Current Rank:
    </p>
    <p className="text-4xl sm:text-5xl font-extrabold text-purple-700 uppercase mb-8 tracking-wider text-shadow-md">
      {rank}
    </p>
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full max-w-xs py-3 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md transition-all duration-200 hover:scale-105">
          CLAIM NEXT RANK
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Rank Information
          </DialogTitle>
        </DialogHeader>
        <p className="text-gray-700 text-base">
          Congratulations! You are currently a **{rank}** rank student!
        </p>
        <p className="text-gray-700 text-base">
          Keep earning points by completing tasks and checking in daily to
          achieve higher ranks and unlock exclusive rewards.
        </p>
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-800">
          Next Rank: Gold (Requires 500 Points)
        </div>
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
      Available Rewards
    </h2>
    <p className="mb-6 text-xl font-semibold text-blue-700 flex items-center">
      <Coins className="w-6 h-6 mr-2 text-yellow-500" /> Your Current Points:{" "}
      {totalPoints}
    </p>
    <div className="space-y-4">
      {rewards.map((reward) => (
        <Card
          key={reward.id}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 shadow-sm rounded-lg border border-gray-100 transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center space-x-3 mb-2 sm:mb-0">
            <Gift className="w-7 h-7 text-red-500" />
            <span
              className={`text-base sm:text-lg font-medium ${
                reward.redeemed ? "line-through text-gray-400" : "text-gray-700"
              }`}
            >
              {reward.name}
            </span>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-sm sm:text-base text-red-600 font-semibold flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              {reward.pointsRequired} Pts
            </span>
            {reward.redeemed ? (
              <span className="text-green-600 font-semibold text-sm sm:text-base ml-4">
                Redeemed!
              </span>
            ) : (
              <Button
                size="sm"
                onClick={() => onRedeemReward(reward.id)}
                disabled={totalPoints < reward.pointsRequired}
                className="ml-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-all duration-200"
              >
                Redeem
              </Button>
            )}
          </div>
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

  const handleToggleTask = (id: string, type: "daily-check-in" | "regular") => {
    setUserData((prevData) => {
      const updatedTasks = prevData.tasks.map((task) => {
        if (task.id === id) {
          if (task.type === "daily-check-in") {
            if (!task.completed) {
              return { ...task, completed: true } as Task; // <-- ADD 'as Task' here
            }
          } else if (task.type === "regular") {
            if (!task.status) {
              return { ...task, status: "pending" } as Task; // <-- ADD 'as Task' here
            }
          }
        }
        return task;
      });

      let newTotalPoints = prevData.totalPoints;
      // Calculate points gain for completed daily check-in
      const dailyCheckInCompleted = updatedTasks.find(
        (t) =>
          t.id === id &&
          t.type === "daily-check-in" &&
          t.completed &&
          !prevData.tasks.find((ot) => ot.id === id)?.completed
      );
      if (dailyCheckInCompleted) {
        newTotalPoints += dailyCheckInCompleted.points;
      }

      // Simulate admin approval for regular tasks after a delay
      // This is for demo purposes; in real app, backend would handle approval
      if (type === "regular") {
        setTimeout(() => {
          setUserData((currentData) => {
            const updatedTasksAfterApproval = currentData.tasks.map((task) => {
              if (task.id === id && task.status === "pending") {
                const isApproved = Math.random() > 0.3; // 70% chance to approve
                if (isApproved) {
                }
                return {
                  ...task,
                  status: isApproved ? "approved" : "rejected",
                } as Task; // <-- ADD 'as Task' here
              }
              return task;
            });

            // Calculate points after approval
            const taskJustApproved = updatedTasksAfterApproval.find(
              (t) =>
                t.id === id &&
                t.status === "approved" &&
                prevData.tasks.find((ot) => ot.id === id)?.status !== "approved"
            );
            if (taskJustApproved) {
              newTotalPoints += taskJustApproved.points; // Add points only if it was just approved
            }

            return {
              ...currentData,
              tasks: updatedTasksAfterApproval,
              totalPoints: newTotalPoints, // Ensure points are updated after async approval
            };
          });
        }, 2000); // Simulate 2-second approval time
      }

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

      {/* Main Content Area */}
      <main className="flex-grow pb-16 md:pb-0 md:ml-20">
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
