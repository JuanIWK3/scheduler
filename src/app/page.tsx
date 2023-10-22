"use client";

import { Fcfs } from "@/components/fcfs";
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
import Image from "next/image";
import { useState } from "react";

type Scheduler = {
  name: string;
  value: string;
};

export default function Home() {
  const [selectedScheduler, setSelectedScheduler] = useState<Scheduler>();

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

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-xl font-bold">Scheduler</h1>
      <Select
        onValueChange={(value) => {
          const scheduler = schedulers.find(
            (scheduler) => scheduler.value === value
          );
          setSelectedScheduler(scheduler);
        }}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a scheduler" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Scheduler</SelectLabel>
            {schedulers.map((scheduler) => (
              <SelectItem key={scheduler.value} value={scheduler.value}>
                {scheduler.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {selectedScheduler?.value === "fcfs" && <Fcfs />}
      {selectedScheduler?.value === "sjf" && <Sjf />}
      {selectedScheduler?.value === "srtf" && <Srtf />}
      {selectedScheduler?.value === "priority" && <Fcfs />}
      {selectedScheduler?.value === "rr" && <Fcfs />}
    </main>
  );
}
