"use client";

import { useState } from "react";
import { useRouterRefresh } from "../lib/use-router-refresh";
import logout from "../actions/logout";
import Modal from "./user-modal";
import { CubeIcon, UserIcon, Logout01Icon, Loading02Icon } from "@/public/icons";

export default function Nav({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const refresh = useRouterRefresh();

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = (event: any) => {
    if (!event) {
      setIsUserLoading(true);
      refresh().then(() => setIsUserLoading(false));
    }
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setIsLogoutLoading(true);
    logout();
  };

  // TO DO:
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
          <button onClick={handleModalOpen} disabled={isUserLoading}>
            {!isUserLoading ?
              <UserIcon />
              :
              <div className="animate-spin"><Loading02Icon /></div>}
          </button>
          <button onClick={handleLogOut} disabled={isLogoutLoading}>
            {!isLogoutLoading ?
              <Logout01Icon />
              :
              <div className="animate-spin"><Loading02Icon /></div>}
          </button>
        </div>
      </nav>
      {isOpen && <Modal handleClose={handleModalClose} user={user} />}
    </>
  );
}