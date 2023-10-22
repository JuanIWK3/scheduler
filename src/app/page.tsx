"use client";

import { Fcfs } from "@/components/fcfs";
import { Results } from "@/components/results";
import { RR } from "@/components/rr";
import { Sjf } from "@/components/sjf";
import { Srtf } from "@/components/srtf";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { ResultsProvider } from "@/contexts/results";
import Image from "next/image";
import { useState } from "react";

type Scheduler = {
  name: string;
  value: string;
};

// Página Inicial
export default function Home() {
  const [selectedScheduler, setSelectedScheduler] = useState<Scheduler>();

  // Array de escalonadores
  const schedulers: Scheduler[] = [
    {
      name: "First Come First Serve",
      value: "fcfs",
    },
    {
      name: "Shortest Job First",
      value: "sjf",
    },
    {
      name: "Shortest Remaining Time First",
      value: "srtf",
    },
    {
      name: "Priority Scheduling",
      value: "priority",
    },
    {
      name: "Round Robin",
      value: "rr",
    },
  ];

  // Html retornado
  return (
    <main className="flex min-h-screen gap-16 flex-col items-center p-24">
      <h1 className="text-xl font-bold">Escalonadores</h1>
      <ResultsProvider>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 lg:grid-cols-3">
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
