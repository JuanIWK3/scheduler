"use client";
import { useResults } from "@/contexts/results";

export const Results = () => {
  const { results } = useResults();

  return (
    <div className="w-full text-center ">
      <p>Resultado</p>
      {JSON.stringify(results)}
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Escalonador</th>
            <th>Tempo Médio</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(results).map((key) => {
            return (
              <tr className="border" key={key}>
                <td className="border">{key}</td>
                <td>{results[key].tempoMedio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
