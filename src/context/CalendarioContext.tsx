import {createContext, useContext, ReactNode} from "react";
import {useCalendario} from "../hooks/useCalendario";

type CalendarioContextType = ReturnType<typeof useCalendario>;

const CalendarioContext = createContext<CalendarioContextType | null>(null);

export function CalendarioProvider({children}: {children: ReactNode}) {
  const calendario = useCalendario();

  return <CalendarioContext.Provider value={calendario}>{children}</CalendarioContext.Provider>;
}

export function useCalendarioContext() {
  const context = useContext(CalendarioContext);
  if (!context) {
    throw new Error("useCalendarioContext debe usarse dentro de un CalendarioProvider");
  }
  return context;
}
