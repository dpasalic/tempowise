"use server";

import { redirect } from "next/navigation";
import { getSession } from "../lib/session";

export default async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};