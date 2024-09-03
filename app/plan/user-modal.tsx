import { useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import createTask from "@/app/actions/create-task";
import { getError, convertMinutesToHM } from "@/app/lib/helpers";
import { MailAtSign01Icon, Time02Icon, TimeHalfPassIcon, Edit02Icon, Alert01Icon, SubtitleIcon, TextIndentIcon, Cancel02Icon } from "@/public/icons";

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
  handleClose: React.MouseEventHandler<HTMLElement>
}

export default function Modal({ handleClose }: ModalProps) {
  const [state, action] = useFormState(createTask, {
    message: "",
    errors: []
  });

  const firstNameError = getError("firstName", state.errors);
  const lastNameError = getError("lastName", state.errors);
  const emailError = getError("email", state.errors);
  const passwordError = getError("password", state.errors);

  const handleModalBodyClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-[rgba(7,7,7,.75)] flex justify-center items-center overflow-y-auto z-50 animate-fade-in ">
      <div
        onClick={handleModalBodyClick}
        className="w-96 p-8 rounded-sm border border-zinc-500 bg-[#070707] animate-drop-in">
        <div className="flex justify-between">
          <h3 className="text-2xl font-bold">Update Profile</h3>
          <button onClick={handleClose}><Cancel02Icon /></button>
        </div>
        <form action={action} noValidate className="flex flex-col gap-2 pt-2">
          <div className="relative flex flex-col">
            {
              !firstNameError ?
                <label htmlFor="title" className="p-2 pb-1 text-sm">Title</label>
                :
                <p id="title-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{firstNameError?.message}</p>
            }
            <div className="absolute left-2 bottom-2"><SubtitleIcon width={18} height={18} /></div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Daily meeting"
              aria-describedby="title-error"
              aria-invalid={firstNameError}
              autoFocus
              className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${firstNameError && "border-rose-800 focus:outline-rose-800"}`} />
            {firstNameError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}