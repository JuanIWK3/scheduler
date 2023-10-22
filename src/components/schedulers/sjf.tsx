"use client";

import { useResults } from "@/contexts/results";
import { processosBasicos } from "@/processos";
import { Process } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProgressBar } from "../progress";

export const Sjf = () => {
  const [time, setTime] = useState(0); // Tempo atual
  const processes = useMemo(
    () => processosBasicos().sort((a, b) => a.arrivalTime - b.arrivalTime),
    []
  );
  const { setResults } = useResults();
  const [tempoDeEsperaTotal, setTempoDeEsperaTotal] = useState(0);

  const finish = () => {
    setResults((results) => ({
      ...results,
      sjf: {
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

      setTime((time) => time + 1);

      const firstProcess = processes.find(
        (process) =>
          process.arrivalTime <= time && process.progress < process.duration
      );

      if (firstProcess) {
        firstProcess.progress++;
        if (firstProcess.duration === firstProcess.progress) {
          const esperaTotal =
            time - firstProcess.arrivalTime - firstProcess.duration + 1;
          setTempoDeEsperaTotal((prev) => prev + esperaTotal);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  // Ordena os processos por id, sem atrapalhar a order da fila
  const derivedProcesses = processes.map((p) => p);
  derivedProcesses.sort((a, b) => a.id - b.id);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      <h2 className="text-lg font-bold">Shortest Job First</h2>
      {derivedProcesses.map((process) => (
        <div key={process.name} className="border-b">
          <ProgressBar process={process} />
        </div>
      ))}
      Total Time Taken: {time}
    </div>
  );
};
