export default function PlanLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="px-24 pb-32">
      {children}
    </main>
  );
}