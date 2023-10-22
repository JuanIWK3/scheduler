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
};

type ResultsContextType = {
  results: {
    [key: string]: Result;
  };
  setResults: Dispatch<
    SetStateAction<{
      fcfs: Result;
      sjf: Result;
      srtf: Result;
      rr: Result;
    }>
  >;
};

const initialState = {
  results: {
    fcfs: {
      tempoMedio: 0,
    },
    sjf: {
      tempoMedio: 0,
    },
    srtf: {
      tempoMedio: 0,
    },
    rr: {
      tempoMedio: 0,
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
