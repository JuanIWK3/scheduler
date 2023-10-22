"use client";

import { Process } from "@/types";
import { useEffect, useState } from "react";
import { ProgressBar } from "./progress";
import { processosBasicos } from "@/app/processos";
import { useResults } from "@/contexts/results";

export const Fcfs = () => {
  const [time, setTime] = useState(0); // Tempo atual
  const [processes, setProcesses] = useState<Process[]>(processosBasicos); // Processos
  const { setResults } = useResults();

  const finish = () => {
    setResults((results) => ({
      ...results,
      fcfs: {
        tempoMedio: time / processes.length,
      },
    }));
  };

  // Função que atualiza o tempo e o progresso dos processos
  useEffect(() => {
    // Intervalo de 1 segundo
    const interval = setInterval(() => {
      // Verifica se todos os processos foram concluídos
      if (processes.every((process) => process.progress === process.duration)) {
        finish();
        clearInterval(interval);
        return;
      }

      // Atualiza o tempo
      setTime((time) => time + 1);

      // Encontra o primeiro processo que chegou e que ainda não foi concluído
      const firstProcess = processes.find(
        (process) =>
          process.arrivalTime <= time && process.progress < process.duration
      );

      // Atualiza o progresso do processo
      if (firstProcess) {
        firstProcess.progress++;
      }
    }, 1000);

    // Retorna a função que limpa o intervalo
    return () => clearInterval(interval);
  }, [time]);

  // Renderiza o escalonador
  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">First Come First Serve</h2>
      {/* Renderiza o componente de progresso para cada processo */}
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
