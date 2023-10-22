"use client";

import { Process } from "@/types";
import { useEffect, useState } from "react";
import { ProgressBar } from "./progress";
import { processosBasicos } from "@/app/processos";
import { useResults } from "@/contexts/results";

export const Fcfs = () => {
  const [time, setTime] = useState(0); // Tempo atual
  const [processes, setProcesses] = useState<Process[]>(
    processosBasicos().sort((a, b) => a.arrivalTime - b.arrivalTime)
  ); // Processos
  const { setResults } = useResults();
  const [tempoDeEsperaTotal, setTempoDeEsperaTotal] = useState(0);

  const finish = () => {
    setResults((results) => ({
      ...results,
      fcfs: {
        tempoMedio: (time + tempoDeEsperaTotal) / processes.length,
        tempoTotal: time,
        numeroTrocasContexto: 0,
        tempoMedioEspera: tempoDeEsperaTotal / processes.length,
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
        if (firstProcess.duration === firstProcess.progress) {
          const esperaTotal =
            time - firstProcess.arrivalTime - firstProcess.duration + 1;
          setTempoDeEsperaTotal((prev) => prev + esperaTotal);
        }
      }
    }, 1000);

    // Retorna a função que limpa o intervalo
    return () => clearInterval(interval);
  }, [time]);

  // Ordena os processos por id, sem atrapalhar a order da fila
  const derivedProcesses = processes.map((p) => p);
  derivedProcesses.sort((a, b) => a.id - b.id);

  // Renderiza o escalonador
  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">First Come First Serve</h2>
      {/* Renderiza o componente de progresso para cada processo */}
      {derivedProcesses.map((process) => (
        <div key={process.name} className="border-b">
          <ProgressBar process={process} />
        </div>
      ))}
      Total Time Taken: {time}
    </div>
  );
};
