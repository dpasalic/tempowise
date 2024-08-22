import { protectRoute } from "../lib/session";
import getTasks from "../actions/get-tasks";
import { convertMinutesToHM } from "../lib/helpers";
import { PlusSignSquareIcon } from "@/public/icons";

export default async function Plan() {
  await protectRoute();

  const tasks = await getTasks("995939064481251329");

  // const renderTasksForDay = (day: string) => {
  //   if (tasks[day]) {
  //     return tasks[day].map((task: any, i: number) => {
  //       return (
  //         <div key={task.id}
  //           style={{ height: `${task.duration_minutes}px` }}
  //           className="p-2 rounded-sm bg-[rgba(255,255,255,.02)] overflow-hidden">
  //           {task.title}
  //           <br />
  //           {convertMinutesToHM(task.start_minutes)}
  //           <br />
  //           {convertMinutesToHM(task.duration_minutes)}
  //         </div>
  //       );
  //     });
  //   }
  // };

  const renderTasksForDay = (day: string) => {
    if (!tasks[day]) {
      return <div className="w-full h-full repeating-gradient"></div>
    } else {
      let renderArr = [];
      for (let i = 0; i < tasks[day].length; i++) {
        const previousTask = tasks[day][i - 1];
        let task = tasks[day][i];

        // render empty space before first task
        if (i === 0 && task.start_minutes !== 0) {
          renderArr.push(<div key={task.id + "emptySpace"} style={{ height: `${task.start_minutes}px` }} className="w-full repeating-gradient"></div>);
        }
        // render empty space before any other task
        else if (previousTask.start_minutes + previousTask.duration_minutes < task.start_minutes) {
          renderArr.push(<div key={task.id + "emptySpace"} style={{ height: `${task.start_minutes - (previousTask.start_minutes + previousTask.duration_minutes)}px` }} className="w-full repeating-gradient"></div>);
        }

        // render task
        renderArr.push(
          <div key={task.id}
            style={{ height: `${task.duration_minutes}px` }}
            className="p-2 bg-[rgba(30,50,30,.5)] overflow-hidden">
            {task.title}
            <br />
            {convertMinutesToHM(task.start_minutes)}
            <br />
            {convertMinutesToHM(task.duration_minutes)}
          </div>
        );

        // render empty space after last task
        if (i === tasks[day].length - 1) {
          renderArr.push(<div key="lastEmptySpace" className="grow w-full rounded-sm repeating-gradient"></div>);
        }
      }

      return renderArr;
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const renderDayNames = () => {
    return days.map(day => <div key={day} className="pl-2 font-black border-l border-l-zinc-500">{day.toUpperCase()}</div>);
  };

  const renderDays = () => {
    return days.map(day => (
      <div key={day} className="flex-1">
        <div className="sticky top-8 flex items-center gap-1 p-2 border-b border-zinc-900 bg-[#070707]">
          <PlusSignSquareIcon width={16} height={16} />
          <p className="text-sm">New task</p>
        </div>
        <div className="flex flex-col gap-0 h-[1440px] p-1">
          {renderTasksForDay(day)}
        </div>
      </div>
    ));
  };

  // TO DO:
  // instead of "New task" at the top, put something else
  // maybe amount of free time or just some design
  // add plus icon centered on empty spaces
  // implement task creation
  // add time marks next to plan

  return (
    <div className="relative">
      <div className="sticky top-0 grid grid-cols-7 p-1 bg-[#070707]">{renderDayNames()}</div>
      <div className="border border-zinc-900 p-1">
        <div className="grid grid-cols-7 border border-zinc-700 rounded-sm">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}