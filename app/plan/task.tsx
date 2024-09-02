"use client";

import { useState } from "react";
import { convertMinutesToHM } from "../lib/helpers";
import { deleteTask } from "../lib/queries";
import { useRouterRefresh } from "../lib/use-router-refresh";
import { Loading02Icon } from "@/public/icons";

interface TaskProps {
  task: any
}

export default function Task({ task }: TaskProps) {
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useRouterRefresh();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteTask(task.id);
    await refresh();
    setIsLoading(false);
  };

  return (
    <div
      key={task.id}
      style={{ height: `${task.duration_minutes}px` }}
      className="relative">
      <div
        className="absolute inset-0 p-2 bg-[rgba(30,50,30,1)] border border-[rgba(255,255,255,.05)] overflow-hidden expand">
        <div className="flex justify-between">
          <p>{task.title}</p>
          <div onClick={handleDelete} className="font-red">del</div>
        </div>
        <br />
        {convertMinutesToHM(task.start_minutes)}
        <br />
        {convertMinutesToHM(task.duration_minutes)}
      </div>
      {isLoading ?
        <div className="absolute top-0 left-0 grid justify-center items-center w-full h-full bg-[rgba(7,7,7,.75)]">
          <div className="animate-spin"><Loading02Icon width={20} height={20} /></div>
        </div> : null}
    </div>
  );
}