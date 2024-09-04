import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SessionOptions, getIronSession } from "iron-session";
import { findUserById } from "./queries";

export interface Session {
  userId?: string,
  first_name?: string,
  last_name?: string,
  email?: string,
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
    session.first_name = res.first_name;
    session.last_name = res.last_name;
    session.email = res.email;
    if (!res) {
      session.isLoggedIn = false;
    }
  }

  return session;
};

export const protectRoute = async (searchedId: string) => {
  "use server";
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  if (searchedId != session.userId) {
    redirect("/error?code=403");
  }

  return session;
}

export const protectAdminRoute = async () => {
  "use server";
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  if (session.role !== "admin") {
    redirect("/error?code=403");
  }

  return session;
};