import { useEffect } from "react";
import { useFormStatus, useFormState } from "react-dom";
import Link from "next/link";
import createTask from "@/app/actions/create-task";
import { getError, convertMinutesToHM } from "@/app/lib/helpers";
import { PlusSignSquareIcon, Time02Icon, TimeHalfPassIcon, ArrowRight03Icon, Alert01Icon, SubtitleIcon, TextIndentIcon, Cancel02Icon } from "@/public/icons";

function SubmitButton() {
  const status = useFormStatus();

  return <button
    type="submit"
    aria-disabled={status.pending}
    aria-label={status.pending ? "Loading" : ""}
    className="p-1 mt-2 rounded-sm bg-emerald-600">
    {status.pending ? "Loading..." : <span className="flex justify-center items-center gap-2"><PlusSignSquareIcon width={20} height={20} />Add to plan</span>}
  </button>
}

interface ModalProps {
  handleClose: React.MouseEventHandler<HTMLElement>,
  startMinutes: number,
  durationMinutes: number,
  size: number,
  day: string
}

export default function Modal({ handleClose, startMinutes, durationMinutes, size, day }: ModalProps) {
  const [state, action] = useFormState(createTask, {
    message: "",
    errors: []
  });

  useEffect(() => {
    if (state.message === "success") {
      handleClose(undefined!);
    }
  }, [state]);

  const titleError = getError("title", state.errors);
  const descriptionError = getError("description", state.errors);
  const startMinutesError = getError("startMinutes", state.errors);
  const durationMinutesError = getError("durationMinutes", state.errors);

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
          <h3 className="text-2xl font-bold">Create Task</h3>
          <button onClick={handleClose}><Cancel02Icon /></button>
        </div>
        <p>{day}, {`${convertMinutesToHM(startMinutes)} - ${convertMinutesToHM(durationMinutes)}`}</p>
        <form action={action} noValidate className="flex flex-col gap-2 pt-2">
          <div className="relative flex flex-col">
            {
              !titleError ?
                <label htmlFor="title" className="p-2 pb-1 text-sm">Title</label>
                :
                <p id="title-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{titleError?.message}</p>
            }
            <div className="absolute left-2 bottom-2"><SubtitleIcon width={18} height={18} /></div>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Daily meeting"
              aria-describedby="title-error"
              aria-invalid={titleError}
              autoFocus
              className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${titleError && "border-rose-800 focus:outline-rose-800"}`} />
            {titleError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
          </div>
          <div className="relative flex flex-col">
            {
              !descriptionError ?
                <label htmlFor="description" className="p-2 pb-1 text-sm">Description</label>
                :
                <p id="description-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{descriptionError?.message}</p>
            }
            <div className="absolute left-2 bottom-2"><TextIndentIcon width={18} height={18} /></div>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Present my daily report"
              aria-describedby="description-error"
              aria-invalid={descriptionError}
              className={`p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${descriptionError && "border-rose-800 focus:outline-rose-800"}`} />
            {descriptionError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
          </div>
          <div className="relative flex flex-col">
            {
              !startMinutesError ?
                <label htmlFor="start-minutes" className="p-2 pb-1 text-sm">Start time</label>
                : <p id="start-minutes-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{startMinutesError?.message}</p>
            }
            <div className="absolute left-2 bottom-2"><Time02Icon width={18} height={18} /></div>
            <input
              type="time"
              id="start-minutes"
              name="start-minutes"
              aria-describedby="start-minutes-error"
              aria-invalid={startMinutesError}
              className={`color-white p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${startMinutesError && "border-rose-800 focus:outline-rose-800"}`} />
            {startMinutesError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
          </div>
          <div className="relative flex flex-col">
            {
              !durationMinutesError ?
                <label htmlFor="duration-minutes" className="p-2 pb-1 text-sm">Duration time</label>
                : <p id="duration-minutes-error" role="alert" className="p-2 pb-1 text-sm text-rose-800">{durationMinutesError?.message}</p>
            }
            <div className="absolute left-2 bottom-2"><TimeHalfPassIcon width={18} height={18} /></div>
            <input
              type="time"
              id="duration-minutes"
              name="duration-minutes"
              aria-describedby="duration-minutes-error"
              aria-invalid={durationMinutesError}
              className={`color-white p-1 pl-9 border border-[rgba(255,255,255,.25)] rounded-sm bg-[rgba(255,255,255,.1)] focus:bg-[rgba(5,150,105,.1)] focus:outline focus:outline-2 focus:outline-white ${durationMinutesError && "border-rose-800 focus:outline-rose-800"}`} />
            {durationMinutesError && <div className="absolute right-2 bottom-2"><Alert01Icon width={18} height={18} /></div>}
          </div>
          <input type="hidden" name="hidden-start-minutes" value={startMinutes} />
          <input type="hidden" name="hidden-duration-minutes" value={durationMinutes} />
          <input type="hidden" name="hidden-day" value={day} />
          <SubmitButton />
        </form>
      </div>
    </div>
  );
}