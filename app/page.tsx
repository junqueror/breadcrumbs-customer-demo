'use client';

import { Suspense } from "react";

import Tracker from "./components/Tracker";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-between sm:items-start h-full">
        <div className="flex flex-col max-w-screen-md">
          <h1 className="text-2xl font-bold">BreadCrumbs Customer Demo</h1>
          <p className="text-sm text-gray-500">
            This is a demo of the BreadCrumbs tracker API from customer side.
          </p>
        </div>
        <div className="max-w-screen-md border border-gray-200/20 rounded-lg p-8">
          <Suspense fallback={<div>Loading...</div>}>
            <Tracker />
          </Suspense>
        </div>
        <div className="max-w-screen-md">
          <h2 className="text-lg font-bold">Documentation</h2>
          <ul className="list-disc list-inside">
            <li>
              Implementation of this demo in <a href="https://github.com/junqueror/breadcrumbs-customer-demo" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              Check the <a href="https://bread-crumbs.tech/docs/developers" target="_blank" rel="noopener noreferrer">BreadCrumbs documentation for developers</a> for more information about the integration.
            </li>
            <li>
              Check the <a href="https://bread-crumbs.tech/api/docs" target="_blank" rel="noopener noreferrer">BreadCrumbs API documentation</a> for more information about the tracker API.
            </li>
          </ul>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center" />
    </div>
  );
}
