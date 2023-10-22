import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Result = {
  tempoMedio: number;
  tempoTotal: number;
  numeroTrocasContexto: number;
  tempoMedioEspera: number;
};

type ResultsContextType = {
  results: {
    [key: string]: Result;
  };
  setResults: Dispatch<
    SetStateAction<{
      [key: string]: Result;
    }>
  >;
};

const initialState: ResultsContextType = {
  results: {
    fcfs: {
      tempoMedio: 0,
      tempoTotal: 0,
      numeroTrocasContexto: 0,
      tempoMedioEspera: 0,
    },
    sjf: {
      tempoMedio: 0,
      tempoTotal: 0,
      numeroTrocasContexto: 0,
      tempoMedioEspera: 0,
    },
    srtf: {
      tempoMedio: 0,
      tempoTotal: 0,
      numeroTrocasContexto: 0,
      tempoMedioEspera: 0,
    },
    rr: {
      tempoMedio: 0,
      tempoTotal: 0,
      numeroTrocasContexto: 0,
      tempoMedioEspera: 0,
    },
  },
  setResults: () => {},
};

const ResultsContext = createContext<ResultsContextType>(initialState);

export const useResults = () => {
  return useContext(ResultsContext);
};

export const ResultsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [results, setResults] = useState(initialState.results);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
