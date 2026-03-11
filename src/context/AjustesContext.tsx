import { createContext, useContext, ReactNode } from 'react';
import { useAjustes, Ajustes, Tema, Moneda, Duracion, Idioma } from '../hooks/useAjustes';

type AjustesContextType = {
  ajustes: Ajustes;
  cargando: boolean;
  actualizarTema: (tema: Tema) => Promise<void>;
  actualizarMoneda: (moneda: Moneda) => Promise<void>;
  actualizarDuracion: (duracion: Duracion) => Promise<void>;
  actualizarIdioma: (idioma: Idioma) => Promise<void>;
};

const AjustesContext = createContext<AjustesContextType | null>(null);

export function AjustesProvider({ children }: { children: ReactNode }) {
  const ajustesHook = useAjustes();
  return (
    <AjustesContext.Provider value={ajustesHook}>
      {children}
    </AjustesContext.Provider>
  );
}

// Hook para consumir el contexto fácilmente
export function useAjustesContext() {
  const context = useContext(AjustesContext);
  if (!context) throw new Error('useAjustesContext debe usarse dentro de AjustesProvider');
  return context;
}