"use client";

import { useState } from "react";
import deleteUser from "../actions/delete-user";
import { useRouterRefresh } from "../lib/use-router-refresh";
import { Loading02Icon } from "@/public/icons";

export default function UsersTable({ data }: { data: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useRouterRefresh();

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    await deleteUser(id);
    await refresh();
    setIsLoading(false);
  };

  return (
    <section className="relative mt-8 overflow-x-auto rounded-sm">
      <table className="min-w-full border border-zinc-500">
        <thead>
          <tr className="border-b-2">
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">ID</th>
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">First Name</th>
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">Last Name</th>
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">Email</th>
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">Role</th>
            <th className="px-6 py-3 border-gray-200 text-left text-sm font-semibold text-zinc-500 uppercase">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user: any) => (
            <tr key={user.id}>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">{user.id}</td>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">{user.first_name}</td>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">{user.last_name}</td>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">{user.email}</td>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">{user.role}</td>
              <td className="px-6 py-4 border-b border-zinc-500 text-sm">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <div className="absolute inset-0 grid justify-center items-center bg-[rgba(7,7,7,.75)]">
        <div className="animate-spin"><Loading02Icon /></div>
      </div>}
    </section>
  );
}