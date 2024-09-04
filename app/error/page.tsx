export default function Error({ searchParams }: { searchParams: any }) {
  let message;

  switch (Number(searchParams.code)) {
    case 403:
      message = "Insufficient permisson";
      break;
    default:
      message = "Oops! Someething went wrong";
  }

  return (
    <main className="grid justify-center p-24">
      <h1 className="text-6xl">{searchParams.code} {message}</h1>
    </main>
  );
}