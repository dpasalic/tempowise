import { useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import editUser from "../actions/edit-user";
import { getError, convertMinutesToHM } from "@/app/lib/helpers";
import { MailAtSign01Icon, Time02Icon, UserIcon, Edit02Icon, Alert01Icon, SquareLockPasswordIcon, Cancel02Icon } from "@/public/icons";

function SubmitButton() {
  const status = useFormStatus();

  return <button
    type="submit"
    aria-disabled={status.pending}
    aria-label={status.pending ? "Loading" : ""}
    className="p-1 mt-2 rounded-sm bg-emerald-600">
    {status.pending ? "Loading..." : <span className="flex justify-center items-center gap-2"><Edit02Icon width={18} height={18} />Make change</span>}
  </button>
}

interface ModalProps {
  handleClose: React.MouseEventHandler<HTMLElement>,
  user: any
}

export default function Modal({ handleClose, user }: ModalProps) {
  const [state, action] = useFormState(editUser, {
    message: "",
    errors: []
  });

  useEffect(() => {
    if (state.message === "success") {
      handleClose(undefined!);
    }
  }, [state]);

  const firstNameError = getError("firstName", state.errors);
  const lastNameError = getError("lastName", state.errors);
  const emailError = getError("email", state.errors);
  const passwordError = getError("password", state.errors);

  const handleModalBodyClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const { userId, first_name, last_name, email } = user;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-[rgba(7,7,7,.75)] flex justify-center items-center overflow-y-auto z-50 animate-fade-in ">
      <div
        onClick={handleModalBodyClick}
        className="w-96 p-8 rounded-sm border border-zinc-500 bg-[#070707] animate-drop-in">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">Edit Profile</h3>
          <button onClick={handleClose}><Cancel02Icon /></button>
        </div>
        <form action={action} noValidate className="flex flex-col gap-2 pt-2">
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
              defaultValue={first_name}
              autoFocus
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
              defaultValue={last_name}
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
              defaultValue={email}
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
          <input type="hidden" name="hidden-id" value={userId} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}