"use client";

import { useState } from "react";
import logout from "../actions/logout";
import Modal from "./user-modal";
import { CubeIcon, UserIcon, Logout01Icon, Loading02Icon } from "@/public/icons";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
  };

  // TO DO:
  // update user
  // admin overview:
  //  - number of tasks,
  //  - total of time tasks take
  //  - radar chart of tasks distributed across days
  //  - number of users
  //  - user with most tasks

  return (
    <>
      <nav className="absolute top-0 left-0 w-full flex justify-between px-24 py-10">
        <CubeIcon />
        <div className="flex gap-10">
          <button onClick={handleModalOpen}>
            <UserIcon />
          </button>
          <button onClick={handleLogOut}>
            {!isLoading ?
              <Logout01Icon />
              :
              <div className="animate-spin"><Loading02Icon /></div>}
          </button>
        </div>
      </nav>
      {isOpen && <Modal handleClose={handleModalClose} />}
    </>
  );
}