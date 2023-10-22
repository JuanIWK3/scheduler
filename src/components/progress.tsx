import { Process } from "@/types";

export const ProgressBar = ({ process }: { process: Process }) => {
  return (
    <div className="">
      <div className="flex w-full justify-between">
        <p>{process.name}</p>
        <p>
          {process.progress}/{process.duration}
        </p>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded">
        <div
          className="h-full bg-green-500 rounded transition-all duration-1000"
          style={{ width: `${(process.progress / process.duration) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};
