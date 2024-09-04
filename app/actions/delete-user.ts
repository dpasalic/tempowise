"use server";

import { removeUser } from "../lib/queries";

export default async function deleteUser(id: number) {
  try {
    await removeUser(id);
  } catch(err: any) {
    console.log(err);
  }
}