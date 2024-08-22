"use server";

import { getTasksOfUser } from "../lib/queries";

export default async function getTasks(userId: string) {
  const res = await getTasksOfUser(userId);

  return res[0].tasks;
}