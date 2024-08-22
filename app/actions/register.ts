"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { insertUser } from "../lib/queries";

const bcrypt = require("bcryptjs");

type FormState = {
  message: string,
  errors: any[]
};

export default async function register(formState: FormState, formData: FormData) {
  let user;

  const firstName = formData.get("first-name") as string;
  const lastName = formData.get("last-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validate = z.object({
    firstName: z.string().trim().min(1, { message: "First name required" }).min(2, { message: "First name must have two or more letters" })
      .regex(new RegExp(/^[a-zA-Z]+$/), { message: "First name must have letters only" }),
    lastName: z.string().trim().min(1, { message: "Last name required" }).min(2, { message: "Last name must have two or more letters" })
      .regex(new RegExp(/^[a-zA-Z]+$/), { message: "Last name must have letters only" }),
    email: z.string().trim().min(1, { message: "Email required" }).email({ message: "Email invalid" }),
    password: z.string().trim().min(5, { message: "Password must be at least 5 characters long" })
      .regex(new RegExp(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,./?]).{5,}$/), { message: "Password must have numbers and special characters" })
  })
    .safeParse({ firstName, lastName, email, password });

  if (!validate.success) {
    return {
      message: "fail",
      errors: validate.error?.issues
    };
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    try {
      await insertUser(firstName, lastName, email, hash);
    } catch (err: any) {
      if (err.code === "23505") {
        return {
          message: "fail",
          errors: [
            { message: "Email already registered", path: ["email"] }
          ]
        };
      }
      return {
        message: "fail",
        errors: [
          { message: "Oops! Something went wrong!", path: ["form"] }
        ]
      };
    }

    redirect("/login");
  }
};