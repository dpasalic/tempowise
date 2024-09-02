"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSession } from "../lib/session";
import { findUserByEmail } from "../lib/queries";

const bcrypt = require("bcryptjs");

type FormState = {
  message: string,
  errors: any[]
};

export default async function login(previousState: FormState, formData: FormData) {
  const session = await getSession();
  let user;

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validate = z.object({
    email: z.string().trim().min(1, { message: "Email required" }).email({ message: "Email invalid" }),
    password: z.string().trim().min(5, { message: "Password must be at least 5 characters long" })
      .regex(new RegExp(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*,./?]).{5,}$/), { message: "Password must have numbers and special characters" })
  })
    .safeParse({ email, password });

  if (!validate.success) {
    return {
      message: "fail",
      errors: validate.error?.issues
    };
  } else {
    try {
      user = await findUserByEmail(email);
    } catch (err) {
      return {
        message: "fail",
        errors: [
          { message: "Oops! Something went wrong!", path: ["form"] }
        ]
      };
    }

    if (!user) {
      return {
        message: "fail",
        errors: [
          { message: "Email not registered", path: ["email"] }
        ]
      };
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return {
        message: "fail",
        errors: [
          { message: "Password not correct", path: ["password"] }
        ]
      };
    }
  }

  session.userId = user.id;
  session.first_name = user.first_name;
  session.last_name = user.last_name;
  session.role = user.role;
  session.isLoggedIn = true;

  await session.save();
  redirect("/plan");
};