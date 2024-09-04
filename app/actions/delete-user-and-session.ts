"use server";

import { getSession } from "../lib/session";
import { removeUser } from "../lib/queries";

export default async function deleteUserAndSession(id: number) {
  try {
    const session = await getSession();
    await session.destroy();
    await removeUser(id);
  } catch(err: any) {
    console.log(err);
  }
}