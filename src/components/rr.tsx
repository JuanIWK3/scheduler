"use client";

import { useEffect, useState } from "react";
import { Process } from "@/types";
import { ProgressBar } from "./progress";
import { processosBasicos } from "@/app/processos";
import { useResults } from "@/contexts/results";

export const RR = () => {
  const [time, setTime] = useState(0);
  const [processes, setProcesses] = useState<Process[]>(processosBasicos);
  const { setResults } = useResults();
  const quantum = 2;

  const finish = () => {
    setResults((results) => ({
      ...results,
      rr: {
        tempoMedio: time / processes.length,
        tempoTotal: time,
      },
    }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let internalTime = time % quantum;
      if (processes.every((process) => process.progress === process.duration)) {
        finish();
        clearInterval(interval);
        return;
      }

      setTime((time) => time + 1);

      // Encontra o primeiro processo que chegou e que ainda não foi concluído
      let firstProcess = processes.find(
        (process) =>
          process.arrivalTime <= time && process.progress < process.duration
      );

      if (firstProcess) {
        firstProcess.progress++;
      }

      if (internalTime === quantum - 1) {
        console.log("pulando");
        internalTime = 0;

        processes.push(processes.shift()!);
        firstProcess = processes.find(
          (process) =>
            process.arrivalTime <= time && process.progress < process.duration
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  // Ordena os processos por id, sem atrapalhar a order da fila
  const derivedProcesses = processes.map((p) => p);
  derivedProcesses.sort((a, b) => a.id - b.id);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">Round Robin</h2>
      {derivedProcesses.map((process) => (
        <div key={process.name} className="border-b">
          <ProgressBar process={process} />
        </div>
      ))}
      Total Time Taken: {time}
    </div>
  );
};
