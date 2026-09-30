import {createContext, useContext, ReactNode} from "react";
import {useAjustes, Ajustes, Tema, Moneda, Duracion, Idioma} from "../hooks/useAjustes";
import {useCalendario} from "../hooks/useCalendario";

type AjustesContextType = ReturnType<typeof useAjustes> & {
  calendario: ReturnType<typeof useCalendario>;
};

const AjustesContext = createContext<AjustesContextType | null>(null);

export function AjustesProvider({children}: {children: ReactNode}) {
  const ajustesHook = useAjustes();
  const calendarioHook = useCalendario();

  return (
    <AjustesContext.Provider value={{...ajustesHook, calendario: calendarioHook}}>{children}</AjustesContext.Provider>
  );
}

export function useAjustesContext() {
  const context = useContext(AjustesContext);
  if (!context) throw new Error("useAjustesContext debe usarse dentro de AjustesProvider");
  return context;
}
