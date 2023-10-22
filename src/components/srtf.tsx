"use client";

import { useEffect, useState } from "react";
import { Process } from "@/types";
import { ProgressBar } from "./progress";
import { processosBasicos } from "@/app/processos";
import { useResults } from "@/contexts/results";

export const Srtf = () => {
  const [time, setTime] = useState(0);
  const [processes, setProcesses] = useState<Process[]>(processosBasicos);
  const { setResults } = useResults();

  const finish = () => {
    setResults((results) => ({
      ...results,
      srtf: {
        tempoMedio: time / processes.length,
        tempoTotal: time,
      },
    }));
  };

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
        finish();
        clearInterval(interval);
        return;
      }

      setTime((time) => time + 1);

      const firstProcess = findShortestRemainingTime(processes);

      if (firstProcess) {
        firstProcess.progress++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">Shortest Remaining Time First</h2>
      {processes
        .sort((a, b) => a.id - b.id)
        .map((process) => (
          <div key={process.name} className="border-b">
            <ProgressBar process={process} />
          </div>
        ))}
      Total Time Taken: {time}
    </div>
  );
};
