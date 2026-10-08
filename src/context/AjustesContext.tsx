import {createContext, useContext, ReactNode} from "react";
import {useAjustes} from "../hooks/useAjustes";

type AjustesContextType = ReturnType<typeof useAjustes>;

const AjustesContext = createContext<AjustesContextType | null>(null);

export function AjustesProvider({children}: {children: ReactNode}) {
  const ajustesHook = useAjustes();

  return <AjustesContext.Provider value={ajustesHook}>{children}</AjustesContext.Provider>;
}

export function useAjustesContext() {
  const context = useContext(AjustesContext);
  if (!context) {
    throw new Error("useAjustesContext debe usarse dentro de AjustesProvider");
  }
  return context;
}
