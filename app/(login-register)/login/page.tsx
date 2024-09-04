"use client";

import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import login from "@/app/actions/login";
import { getError } from "@/app/lib/helpers";
import { MailAtSign01Icon, SquareLockPasswordIcon, ArrowRight03Icon, Alert01Icon } from "@/public/icons";

function SubmitButton() {
  const status = useFormStatus();

  return <button
    type="submit"
    aria-disabled={status.pending}
    aria-label={status.pending ? "Loading" : ""}
    className="p-1 mt-2 rounded-sm bg-emerald-600">
    {status.pending ? "Loading..." : <span className="flex justify-center gap-2"><ArrowRight03Icon />Start organizing</span>}
  </button>
}

export default function Form() {
  const [state, action] = useFormState(login, {
    message: "",
    errors: []
  });

  const emailError = getError("email", state.errors);
  const passwordError = getError("password", state.errors);

  return (
    <div className="h-[320px] p-6 border border-zinc-500 rounded-sm z-50">
      <h1 className="text-2xl font-bold">Login</h1>
      <form action={action} noValidate className="flex flex-col gap-2 pt-2">
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
            autoFocus
            placeholder="mujo@example.com"
            aria-describedby="email-error"
            aria-invalid={emailError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${emailError && "border-rose-800 focus:outline-rose-800"}`} />
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
            aria-describedby="password-error"
            aria-invalid={passwordError}
            className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${passwordError && "border-rose-800 focus:outline-rose-800"}`} />
          {passwordError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
        </div>
        <SubmitButton />
      </form>
      <div role="alert" className="p-2 pb-1 text-center text-sm text-rose-800">
        {state.message === "fail" && !emailError && !passwordError ? state.errors[0].message : null}
      </div>
      <div className="flex justify-center gap-1 pt-4 text-xs">Do not have an account?<Link href="/register" className="underline">Register here!</Link></div>
    </div>
  );
}