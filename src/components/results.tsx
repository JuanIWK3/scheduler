"use client";
import { useResults } from "@/contexts/results";

export const Results = () => {
  const { results } = useResults();

  return (
    <div className="w-full text-center ">
      <h2 className="text-xl font-bold">Resultado</h2>
      <table className="w-full border">
        <thead>
          <tr className="border">
            <th>Escalonador</th>
            <th>Tempo Médio</th>
            <th>Tempo Total</th>
            <th>Tempo Médio de Espera</th>
            <th>Número de Trocas de Contexto</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(results).map((key) => {
            return (
              <tr className="border" key={key}>
                <td className="border">{key}</td>
                <td>{results[key].tempoMedio}</td>
                <td>{results[key].tempoTotal}</td>
                <td>{results[key].tempoMedioEspera}</td>
                <td>{results[key].numeroTrocasContexto}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
