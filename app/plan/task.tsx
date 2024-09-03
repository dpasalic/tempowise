"use client";

import { useState, useRef } from "react";
import { convertMinutesToHM } from "../lib/helpers";
import { deleteTask } from "../lib/queries";
import { useRouterRefresh } from "../lib/use-router-refresh";
import { Loading02Icon, Delete02Icon } from "@/public/icons";
import { useOverflow } from "../lib/use-overflow";

interface TaskProps {
  task: any,
  index: number
}

export default function Task({ task, index }: TaskProps) {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isOverflow = useOverflow(ref);

  const refresh = useRouterRefresh();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTask(task.id);
    await refresh();
    setIsLoading(false);
  };

  const zIndex = 45 - index;

  return (
    <div
      key={task.id}
      style={{ height: `${task.duration_minutes}px`, zIndex }}
      className="relative">
      <div
        ref={ref}
        className={`${isOverflow ? "expand" : null} absolute inset-0 p-2 bg-[rgba(30,50,30,1)] border border-[rgba(255,255,255,.05)] overflow-hidden`}>
        <div className="flex justify-between items-start">
          <h4 className="text-lg font-black pr-2">{task.title}</h4>
          <button onClick={handleDelete} className="font-red">
            <Delete02Icon width={18} height={18} />
          </button>
        </div>
        <div className="flex gap-2 pt-1 text-sm">
          <p>{convertMinutesToHM(task.start_minutes)}</p>
          <p>-</p>
          <p>{convertMinutesToHM(task.start_minutes + task.duration_minutes)}</p>
        </div>
        <p className="text-md pt-4">{task.description}</p>
      </div>
      {isLoading ?
        <div className="absolute top-0 left-0 grid justify-center items-center w-full h-full bg-[rgba(7,7,7,.75)]">
          <div className="animate-spin"><Loading02Icon width={20} height={20} /></div>
        </div> : null}
    </div>
  );
}