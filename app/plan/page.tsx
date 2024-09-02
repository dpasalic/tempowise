import { protectRoute } from "../lib/session";
import getTasks from "../actions/get-tasks";
import { convertMinutesToHM } from "../lib/helpers";
import { PlusSignSquareIcon } from "@/public/icons";
import EmptySpace from "./empty-space";
import Task from "./task";

export default async function Plan() {
  const user = await protectRoute();

  const tasks = await getTasks("995939064481251329");

  const renderTasksForDay = (day: string) => {
    if (!tasks || !tasks[day]) {
      return <EmptySpace key="emptySpace" size={1440} startMinutes={0} durationMinutes={1440} day={day} />;
    } else {
      let renderArr = [];
      for (let i = 0; i < tasks[day].length; i++) {
        const previousTask = tasks[day][i - 1];
        let task = tasks[day][i];

        // render empty space before first task
        if (i === 0 && task.start_minutes !== 0) {
          renderArr.push(<EmptySpace key={`${task.id}_emptySpace`} size={task.start_minutes} startMinutes={0} durationMinutes={task.start_minutes} day={day} />);
          // renderArr.push(<div key={task.id + "emptySpace"} style={{ height: `${task.start_minutes}px` }} className="grid justify-center w-full border border-[#070707] repeating-gradient hover:border-white"></div>);
        }
        // render empty space before any other task
        else if (previousTask?.start_minutes + previousTask?.duration_minutes < task.start_minutes) {
          renderArr.push(<EmptySpace key={`${task.id}_emptySpace`} size={task.start_minutes - (previousTask.start_minutes + previousTask.duration_minutes)} startMinutes={previousTask.start_minutes + previousTask.duration_minutes} durationMinutes={task.start_minutes} day={day} />)
          // renderArr.push(<div key={task.id + "emptySpace"} style={{ height: `${task.start_minutes - (previousTask.start_minutes + previousTask.duration_minutes)}px` }} className="w-full border border-[#070707] repeating-gradient hover:border-white"></div>);
        }

        // render task
        renderArr.push(<Task task={task} />);

        // render empty space after last task
        if (i === tasks[day].length - 1) {
          renderArr.push(<EmptySpace key="lastEmptySpace" size={1440 - (task.start_minutes + task.duration_minutes)} classNames={"grow"} startMinutes={task.start_minutes + task.duration_minutes} durationMinutes={0} day={day} />);
          // renderArr.push(<div key="lastEmptySpace" className="grow w-full border border-[#070707] repeating-gradient hover:border-white"></div>);
        }
      }

      return renderArr;
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const renderDayNames = () => {
    return days.map(day => <div key={day} className="pl-2 text-lg font-black border-l border-l-zinc-500">{day.toUpperCase()}</div>);
  };

  const renderDays = () => {
    return days.map(day => (
      <div key={day} className="flex-1">
        <div className="sticky top-8 flex items-center gap-1 p-2 border-b border-zinc-900 bg-[#070707] z-10">
          <PlusSignSquareIcon width={16} height={16} />
          <p className="text-sm">04:35</p>
        </div>
        <div className="flex flex-col gap-0 h-[1440px] p-1">
          {renderTasksForDay(day)}
        </div>
      </div>
    ));
  };

  const renderHourMarks = () => {
    let marksArr = [];
    for (let i = 0; i < 24; i++) {
      marksArr.push(<div key={i} className="relative w-full h-px bg-[rgba(40,40,40,.2)]">
        <div className="absolute top-[-17px] left-[-5px]">
          <span className="text-xl font-black">{`${i < 10 ? "0" + i : i}`}</span>
          <span className="text-sm">:00</span>
        </div>
      </div>);
    }

    return marksArr;
  };

  return (
    <div className="relative pl-14">
      <div className="pb-12 text-4xl font-black">{user.first_name} {user.last_name}</div>
      <div className="absolute top-0 left-0 flex flex-col justify-between w-full h-full pt-[170px] pb-[69px]">
        {renderHourMarks()}
      </div>
      <div className="sticky top-0 grid grid-cols-7 p-1 bg-[#070707] z-10">{renderDayNames()}</div>
      <div className="relative border border-zinc-900 p-1">
        <div className="grid grid-cols-7 border border-zinc-700 rounded-sm">
          {renderDays()}
        </div>
      </div>
    </div>
  );
}