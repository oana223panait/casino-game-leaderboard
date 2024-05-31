import { UserTable } from "@/components/data-table";

import Link from 'next/link'

async function getData() {
  const res = await fetch('http://localhost:4000/api/getUsers')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
export default async function Home() {
  const userData = await getData()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-blue-200 lg:p-4 lg:dark:bg-zinc-800/30 font-mono font-bold">
          Leaderboard - based on win count&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <Link href="/photos">
            <h2 className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-blue-200 lg:p-4 lg:dark:bg-zinc-800/30 font-mono font-bold">
              Photos
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
          </Link>
        </div>
      </div>
      <div >
        <UserTable data={userData} />
      </div>
    </main>
  );
}
