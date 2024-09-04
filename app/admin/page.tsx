import { protectAdminRoute } from "../lib/session";
import { getTasksOverview, getUsers } from "../lib/queries";
import { calculateOverallData, convertMinutesToHM } from "../lib/helpers";
import { LeftToRightListNumberIcon, HourglassIcon } from "@/public/icons";
import TasksChart from "./tasks-chart";
import UsersTable from "./users-table";

export default async function AdminPanel() {
  const user = await protectAdminRoute();

  const tasksData = await getTasksOverview();

  const usersData = await getUsers();

  const overall = calculateOverallData(tasksData);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const chartData = daysOfWeek.map(day => {
    const taskData = tasksData.find((task: any) => task.day_of_week === day);
    return {
      subject: day,
      total_tasks: taskData ? Number(taskData.total_tasks) : 0
    };
  });

  return (
    <main className="px-8 md:px-24 pt-24 pb-32">
      <h1 className="pb-12 text-4xl font-black">Admin Panel</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <section className="grow flex flex-col 2xl:flex-row justify-center items-center gap-24 p-8 border border-zinc-500 rounded-sm">
          <div className="flex flex-col items-center">
            <h3 className="pb-4 text-8xl font-black">{overall.total_tasks}</h3>
            <div className="flex items-center gap-2">
              <LeftToRightListNumberIcon width={50} height={50} color="#71717a" />
              <p className="text-lg text-zinc-500">Total number <br />of tasks</p>
            </div>
          </div>
          <div className="w-64 md:w-[500px] h-64 md:h-96">
            <TasksChart data={chartData} />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="pb-4 text-8xl font-black">{convertMinutesToHM(overall.total_minutes)}</h3>
            <div className="flex items-center gap-2">
              <HourglassIcon width={50} height={50} color="#71717a" />
              <p className="text-lg text-zinc-500">Total time<br />tasks require</p>
            </div>
          </div>
        </section>
        <section className="grow flex flex-col justify-center items-center p-8 border border-zinc-500 rounded-sm">
          <h3 className="pb-4 text-8xl font-black">{usersData.length}</h3>
          <div className="flex items-center gap-2">
            <LeftToRightListNumberIcon width={50} height={50} color="#71717a" />
            <p className="text-lg text-zinc-500">Total number<br />of users</p>
          </div>
        </section>
      </div>
      <UsersTable data={usersData} />
    </main>
  );
}