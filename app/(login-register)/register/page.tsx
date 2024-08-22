"use client";

import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import register from "@/app/actions/register";
import { getError } from "@/app/lib/helpers";
import { UserIcon, MailAtSign01Icon, SquareLockPasswordIcon, UserAdd01Icon, Alert01Icon } from "@/public/icons";

function SubmitButton() {
  const status = useFormStatus();

  // console.log(status);

  return <button
    type="submit"
    aria-disabled={status.pending}
    aria-label={status.pending ? "Loading" : ""}
    className="p-1 mt-2 rounded-sm bg-emerald-600">
    {status.pending ? "Loading..." : <span className="flex justify-center items-center gap-2"><UserAdd01Icon width={18} height={18} />Create account</span>}
  </button>
}

export default function Form() {
  const [state, action] = useFormState(register, {
    message: "",
    errors: []
  });

  console.log(state)

  const firstNameError = getError("firstName", state.errors);
  const lastNameError = getError("lastName", state.errors);
  const emailError = getError("email", state.errors);
  const passwordError = getError("password", state.errors);

  return (
    <div className="border border-zinc-500 p-6 rounded-sm z-50">
      <h1 className="text-2xl font-bold">Register</h1>
      <form action={action} noValidate className="flex flex-col gap-2 pt-4">
        <div className="relative flex flex-col">
          {
            !firstNameError ?
              <label htmlFor="first-name" className="p-2 pb-1 text-sm">First name</label>
              :
              <p id="first-name-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{firstNameError?.message}</p>
          }
          <div className="absolute left-2 bottom-2"><UserIcon width={18} height={18} /></div>
          <input
            type="text"
            id="first-name"
            name="first-name"
            placeholder="Mujo"
            aria-describedby="first-name-error"
            aria-invalid={firstNameError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${firstNameError && "border-rose-800 focus:outline-rose-800"}`} />
          {firstNameError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
        </div>
        <div className="relative flex flex-col">
          {
            !lastNameError ?
              <label htmlFor="last-name" className="p-2 pb-1 text-sm">Last name</label>
              :
              <p id="last-name-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{lastNameError?.message}</p>
          }
          <div className="absolute left-2 bottom-2"><UserIcon width={18} height={18} /></div>
          <input
            type="text"
            id="last-name"
            name="last-name"
            placeholder="Mujic"
            aria-describedby="last-name-error"
            aria-invalid={lastNameError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${lastNameError && "border-rose-800 focus:outline-rose-800"}`} />
          {lastNameError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
        </div>
        <div className="relative flex flex-col">
          {
            !emailError ?
              <label htmlFor="email" className="p-2 pb-1 text-sm">Email</label>
              :
              <p id="email-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{emailError?.message}</p>
          }
          <div className="absolute left-2 bottom-2"><MailAtSign01Icon width={18} height={18} /></div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="mujo@example.com"
            aria-describedby="email-error"
            aria-invalid={emailError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${lastNameError && "border-rose-800 focus:outline-rose-800"}`} />
          {emailError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
        </div>
        <div className="relative flex flex-col">
          {
            !passwordError ?
              <label htmlFor="password" className="p-2 pb-1 text-sm">Password</label>
              :
              <p id="password-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{passwordError?.message}</p>
          }
          <div className="absolute left-2 bottom-2"><SquareLockPasswordIcon width={18} height={18} /></div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="●●●●●●●"
            aria-describedby="email-error"
            aria-invalid={emailError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${lastNameError && "border-rose-800 focus:outline-rose-800"}`} />
          {passwordError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
        </div>
        <SubmitButton />
      </form>
      <div role="alert" className="p-2 pb-1 text-center text-sm text-rose-800">
        {state.message === "fail" && !firstNameError && !lastNameError && !emailError && !passwordError ? state.errors[0].message : null}
      </div>
      <div className="flex justify-center gap-1 pt-4 text-xs">Already have an account?<Link href="/login" className="underline">Login here!</Link></div>
    </div>
  );
}