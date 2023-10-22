export type Process = {
  name: string;
  duration: number;
  progress: number;
  arrivalTime: number;
};

export type Scheduler = {
  add: (process: Process) => void;
};

export const createFCFSScheduler = (): Scheduler => {
  const processes: Process[] = [];

  const add = (process: Process) => {
    processes.push(process);
  };

  return { add };
};
