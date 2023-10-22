import { Process } from "@/types";

export const processosBasicos = (): Process[] => [
  { id: 1, name: "P1", duration: 5, progress: 0, arrivalTime: 3 },
  { id: 2, name: "P2", duration: 3, progress: 0, arrivalTime: 3 },
  { id: 3, name: "P3", duration: 8, progress: 0, arrivalTime: 0 },
  { id: 4, name: "P4", duration: 6, progress: 0, arrivalTime: 3 },
  { id: 5, name: "P5", duration: 2, progress: 0, arrivalTime: 3 },
];

export const sortedByDuration = sortByDuration(processosBasicos());

export function isFinished(
  processos: Process[],
  finish: () => void,
  interval: NodeJS.Timeout
) {
  if (processos.every((process) => process.progress === process.duration)) {
    finish();
    clearInterval(interval);
    return;
  }
}

export function incrementWaitTime(
  time: number,
  firstProcess: Process,
  setTempoDeEsperaTotal: (value: React.SetStateAction<number>) => void
) {
  const esperaTotal =
    time - firstProcess.arrivalTime - firstProcess.duration + 1;
  setTempoDeEsperaTotal((prev) => prev + esperaTotal);
}

export function sortByArrivalTime(processos: Process[]) {
  return processos.sort((a, b) => a.arrivalTime - b.arrivalTime);
}

export function sortById(processos: Process[]) {
  return processos.sort((a, b) => a.id - b.id);
}

export function sortByDuration(processos: Process[]) {
  return processos.sort((a, b) => a.duration - b.duration);
}
