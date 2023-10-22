"use client";

import { useEffect, useState } from "react";
import { Process } from "@/types";
import { ProgressBar } from "./progress";

const initialProcesses: Process[] = [
  { id: 1, name: "P1", duration: 5, progress: 0, arrivalTime: 3 },
  { id: 2, name: "P2", duration: 3, progress: 0, arrivalTime: 3 },
  { id: 3, name: "P3", duration: 8, progress: 0, arrivalTime: 0 },
  { id: 4, name: "P4", duration: 6, progress: 0, arrivalTime: 3 },
  { id: 5, name: "P5", duration: 2, progress: 0, arrivalTime: 3 },
];

export const Srtf = () => {
  const [time, setTime] = useState(0);
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);

  const findShortestRemainingTime = (processes: Process[]) => {
    const sortedProcesses = processes.sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );

    const firstProcess = sortedProcesses.find(
      (process) =>
        process.arrivalTime <= time && process.progress < process.duration
    );

    if (!firstProcess) {
      return null;
    }

    const remainingProcesses = sortedProcesses.filter(
      (process) => process.id !== firstProcess.id
    );

    const shortestRemainingTime = remainingProcesses.find(
      (process) =>
        process.arrivalTime <= time &&
        process.progress < process.duration &&
        process.duration - process.progress <
          firstProcess.duration - firstProcess.progress
    );

    return shortestRemainingTime || firstProcess;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      processes.sort((a, b) => a.duration - b.duration);

      if (processes.every((process) => process.progress === process.duration)) {
        clearInterval(interval);
        return;
      }

      setTime((time) => time + 1);

      const firstProcess = findShortestRemainingTime(processes);

      console.log(firstProcess, time);

      if (firstProcess) {
        firstProcess.progress++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      {processes
        .sort((a, b) => a.id - b.id)
        .map((process) => (
          <div key={process.name} className="border-b">
            <ProgressBar process={process} />
          </div>
        ))}
      Total Time Taken: {time}
      <hr />
      {JSON.stringify(processes)}
    </div>
  );
};
