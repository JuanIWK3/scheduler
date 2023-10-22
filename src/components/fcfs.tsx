"use client";

import { Process } from "@/schedulers/fcfs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const initialProcesses: Process[] = [
  { name: "P1", duration: 5, progress: 0, arrivalTime: 3 },
  { name: "P2", duration: 3, progress: 0, arrivalTime: 3 },
  { name: "P3", duration: 8, progress: 0, arrivalTime: 3 },
  { name: "P4", duration: 6, progress: 0, arrivalTime: 3 },
  { name: "P5", duration: 2, progress: 0, arrivalTime: 0 },
];

export const Fcfs = () => {
  const [time, setTime] = useState(0);
  const [processes, setProcesses] = useState<Process[]>(initialProcesses);

  useEffect(() => {
    const interval = setInterval(() => {
      if (processes.every((process) => process.progress === process.duration)) {
        clearInterval(interval);
        return;
      }

      setTime((time) => time + 1);

      const firstProcess = processes.find(
        (process) =>
          process.arrivalTime <= time && process.progress < process.duration
      );

      console.log(firstProcess, time);

      if (firstProcess) {
        firstProcess.progress++;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="w-full mt-8 gap-4 flex flex-col">
      {processes.map((process) => (
        <div key={process.name} className="border-b">
          {process.name}{" "}
          <ProgressBar
            duration={process.duration}
            progress={process.progress}
          />
        </div>
      ))}
      Total Time Taken: {time}
    </div>
  );
};

const ProgressBar = ({
  duration,
  progress,
}: {
  duration: number;
  progress: number;
}) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded">
      <div
        className="h-full bg-green-500 rounded"
        style={{ width: `${(progress / duration) * 100}%` }}
      ></div>
    </div>
  );
};
