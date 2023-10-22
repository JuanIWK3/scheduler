"use client";

import { Results } from "@/components/results";
import { Fcfs } from "@/components/schedulers/fcfs";
import { RR } from "@/components/schedulers/rr";
import { Sjf } from "@/components/schedulers/sjf";
import { Srtf } from "@/components/schedulers/srtf";
import { ResultsProvider } from "@/contexts/results";
import { useState } from "react";

type Scheduler = {
  name: string;
  value: string;
};

// Página Inicial
export default function Home() {
  return (
    <main className="flex min-h-screen gap-16 flex-col items-center p-24">
      <h1 className="text-xl font-bold">Escalonadores</h1>
      <ResultsProvider>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:grid-cols-3 xl:grid-cols-4">
          <Fcfs />
          <Sjf />
          <Srtf />
          <RR />
        </div>
        <Results />
      </ResultsProvider>
    </main>
  );
}
