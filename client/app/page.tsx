

export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-poppins min-[1000px]:text-blue-500">
        Tailwind Test Page
      </h1>

      <p className="font-josefin text-xl">
        If you can see styled text → Tailwind is working ✔
      </p>

      <button className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded">
        Dark Mode Button
      </button>
    </main>
    </div>
  );
}
