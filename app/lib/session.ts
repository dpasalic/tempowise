import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SessionOptions, getIronSession } from "iron-session";
import { findUserById } from "./queries";

export interface Session {
  userId?: string,
  first_name?: string,
  last_name?: string,
  role?: string,
  isLoggedIn: boolean
}

// export const defaultSession: Session = {
//   isLoggedIn: false
// };

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET_KEY!,
  cookieName: "tempo-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  }
};

export const getSession = async () => {
  "use server";
  const session = await getIronSession<Session>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  } else if (session.userId) {
    const res = await findUserById(session.userId);
    if (!res) {
      session.isLoggedIn = false;
    }
  }

  return session;
};

export const protectRoute = async () => {
  "use server";
  const session = await getSession();
  return session;

  if (!session.isLoggedIn) {
    redirect("/login");
  }
}