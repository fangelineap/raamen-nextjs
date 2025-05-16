import Navbar from "./raamen/components/Navbar";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <div className="flex gap-4 flex-col sm:flex-row">
          {children}
        </div>
      </main>
      <footer className="bg-pink-950 w-full h-[100vh] row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1>Footer</h1>
      </footer>
    </div>
  );
}
