"use server";

import { z } from "zod";
import { updateUser, updateUserPassword } from "../lib/queries";

const bcrypt = require("bcryptjs");

type FormState = {
  message: string,
  errors: any[],
  updatedUser?: any
};

export default async function editUser(formState: FormState, formData: FormData) {
  let user;

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userId = formData.get("hidden-id") as string;

  const validate = z.object({
    firstName: z.string().trim().min(1, { message: "First name required" }).min(2, { message: "First name must have two or more letters" })
      .regex(new RegExp(/^[a-zA-Z]+$/), { message: "First name must have letters only" }),
    lastName: z.string().trim().min(1, { message: "Last name required" }).min(2, { message: "Last name must have two or more letters" })
      .regex(new RegExp(/^[a-zA-Z]+$/), { message: "Last name must have letters only" }),
    email: z.string().trim().min(1, { message: "Email required" }).email({ message: "Email invalid" }),
    password: z.string().trim()
      .refine(val => val.length === 0 || val.length >= 5, {
        message: "Password must be at least 5 characters long or empty",
      })
      .refine(val => val.length === 0 || /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,./?]).{5,}$/.test(val), {
        message: "Password must have numbers and special characters",
      })
  })
    .safeParse({ firstName, lastName, email, password });

  if (!validate.success) {
    return {
      message: "fail",
      errors: validate.error?.issues
    };
  } else {
    try {
      if (password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await updateUserPassword(userId, firstName, lastName, email, hash);
      } else {
        await updateUser(userId, firstName, lastName, email);
      }
      return {
        message: "success",
        errors: [
          { message: "", path: [""] }
        ]
      };
    } catch (err: any) {
      return {
        message: "fail",
        errors: [
          { message: "Oops! Something went wrong!", path: ["form"] }
        ]
      };
    }
  }
};