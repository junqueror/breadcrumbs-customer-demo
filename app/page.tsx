'use client';

import { Suspense } from "react";

import Tracker from "./components/Tracker";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col max-w-screen-md">
          <h1 className="text-2xl font-bold">BreadCrumbs Customer Demo</h1>
          <p className="text-sm text-gray-500">
            This is a demo of the BreadCrumbs tracker API from customer side.
          </p>
        </div>
        <div className="max-w-screen-md">
          <Suspense fallback={<div>Loading...</div>}>
            <Tracker />
          </Suspense>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
