"use client";

import { useEffect, useState } from "react";
import { Process } from "@/types";
import { ProgressBar } from "./progress";
import { processosBasicos } from "@/app/processos";
import { useResults } from "@/contexts/results";

export const Sjf = () => {
  const [time, setTime] = useState(0); // Tempo atual
  const [processes, setProcesses] = useState<Process[]>(processosBasicos); // Processos
  const { setResults } = useResults();

  const finish = () => {
    setResults((results) => ({
      ...results,
      sjf: {
        tempoMedio: time / processes.length,
        tempoTotal: time,
      },
    }));
  };

  // Função que atualiza o tempo e o progresso dos processos
  useEffect(() => {
    // Intervalo de 1 segundo
    const interval = setInterval(() => {
      processes.sort((a, b) => a.duration - b.duration);

      // Verifica se todos os processos foram concluídos
      if (processes.every((process) => process.progress === process.duration)) {
        finish();
        clearInterval(interval);
        return;
      }

      setTime((time) => time + 1);

      const firstProcess = processes.find(
        (process) =>
          process.arrivalTime <= time && process.progress < process.duration
      );

      if (firstProcess) {
        firstProcess.progress++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">Shortest Job First</h2>
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
