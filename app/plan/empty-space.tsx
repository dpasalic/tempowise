"use client";

import { useState, useEffect } from "react";
import { useRouterRefresh } from "../lib/use-router-refresh";
import { PlusSignSquareIcon, Loading02Icon } from "@/public/icons";
import Modal from "./create-task-modal";

interface EmptySpaceProps {
  key: string,
  startMinutes: number,
  durationMinutes: number,
  size: number,
  day: string,
  classNames?: string
}

export default function EmptySpace({ key, startMinutes, durationMinutes, size, day, classNames }: EmptySpaceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useRouterRefresh();

  const handleMouseEnter = () => {
    if (isLoading) {
      return;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleModalOpen = () => {
    if (isLoading) {
      return;
    }
    setIsOpen(true);
  };

  const handleModalClose = (event: any) => {
    if (!event) {
      setIsLoading(true);
      refresh().then(() => setIsLoading(false));
    }
    setIsOpen(false);
  };

  const isLarge = size > 100 && size < 1441;
  return (
    <>
      <div
        key={key}
        style={size < 1441 ? { height: `${size}px` } : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleModalOpen}
        className={`${classNames} relative justify-center w-full border border-[#070707] repeating-gradient hover:border-white transition-colors`}>
        {isLarge ? <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <PlusSignSquareIcon width={40} height={40} color={!isHovered ? "#171717" : "#fff"} />
        </div> : null}
        {isLoading ?
          <div className="absolute top-0 left-0 grid justify-center items-center w-full h-full bg-[rgba(7,7,7,.75)]">
            <div className="animate-spin"><Loading02Icon width={20} height={20} /></div>
          </div> : null}
      </div>
      {isOpen && <Modal handleClose={handleModalClose} startMinutes={startMinutes} durationMinutes={durationMinutes} size={size} day={day} />}
    </>
  );
}