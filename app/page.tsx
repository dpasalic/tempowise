import logout from "./actions/logout";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>home</h1>
      <form action={logout}>
        <button type="submit">log out</button>
      </form>
    </main>
  );
}
