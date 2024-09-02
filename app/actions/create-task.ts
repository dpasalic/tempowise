"use server";

import { z } from "zod";
import { getSession } from "../lib/session";
import { insertTask } from "../lib/queries";
import { convertHMToMinutes, convertMinutesToHM } from "../lib/helpers";

type FormState = {
  message: string,
  errors: any[]
};

export default async function createTask(previousState: FormState, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const startMinutes = formData.get("start-minutes") as string;
  const durationMinutes = formData.get("duration-minutes") as string;
  const emptySpaceStartMinutes = Number(formData.get("hidden-start-minutes") as string);
  const emptySpaceDurationMinutes = Number(formData.get("hidden-duration-minutes") as string);
  const day = formData.get("hidden-day") as string;

  const validate = z.object({
    title: z.string().trim().min(1, { message: "Title required" }).min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string().trim().min(1, { message: "Description required" }).min(3, { message: "Description must be at least 3 characters long" }),
    startMinutes: z.string().trim().min(1, { message: "Start time required" })
      .refine(val => {
        const start = convertHMToMinutes(val);
        if (emptySpaceDurationMinutes === 0) {
          return start >= emptySpaceStartMinutes && start < 1440;
        }
        return start >= emptySpaceStartMinutes && start < emptySpaceDurationMinutes;
      }, { message: "Start time out of bounds" }),
    durationMinutes: z.string().trim().min(1, { message: "Duration time required" })
      .refine(val => {
        const duration = convertHMToMinutes(val);
        const start = convertHMToMinutes(startMinutes);
        if (emptySpaceDurationMinutes === 0) {
          return duration + start <= 1440;
        }
        return duration + start <= emptySpaceDurationMinutes;
      }, { message: "Duration time out of bounds" }),
  })
    .safeParse({ title, description, startMinutes, durationMinutes });

  if (!validate.success) {
    return {
      message: "fail",
      errors: validate.error?.issues
    };
  } else {
    try {
      const { userId } = await getSession();
      const start = convertHMToMinutes(startMinutes);
      const duration = convertHMToMinutes(durationMinutes);
      await insertTask(userId!, title, description, start, duration, day);
    } catch (err) {
      return {
        message: "fail",
        errors: [
          { message: "Oops! Something went wrong!", path: ["form"] }
        ]
      };
    }
  }

  return {
    message: "success",
    errors: [
      { message: "", path: [""] }
    ]
  };
};