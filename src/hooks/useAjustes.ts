import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Tema = 'claro' | 'oscuro' | 'sistema';
export type Moneda = '€' | '$' | '£';
export type Duracion = 0.5 | 1 | 1.5 | 2;

export type Ajustes = {
  tema: Tema;
  moneda: Moneda;
  duracion: Duracion;
};

const AJUSTES_DEFAULT: Ajustes = {
  tema: 'sistema',
  moneda: '€',
  duracion: 1,
};

const KEYS = {
  tema: '@ajustes_tema',
  moneda: '@ajustes_moneda',
  duracion: '@ajustes_duracion',
};

export function useAjustes() {
  const [ajustes, setAjustes] = useState<Ajustes>(AJUSTES_DEFAULT);
  const [cargando, setCargando] = useState(true);

  // Cargar ajustes al iniciar
  useEffect(() => {
    const cargarAjustes = async () => {
      try {
        const [tema, moneda, duracion] = await AsyncStorage.multiGet([
          KEYS.tema, KEYS.moneda, KEYS.duracion
        ]);
        setAjustes({
          tema: (tema[1] as Tema) ?? AJUSTES_DEFAULT.tema,
          moneda: (moneda[1] as Moneda) ?? AJUSTES_DEFAULT.moneda,
          duracion: duracion[1] ? parseFloat(duracion[1]) as Duracion : AJUSTES_DEFAULT.duracion,
        });
      } catch (e) {
        console.error('Error cargando ajustes:', e);
      } finally {
        setCargando(false);
      }
    };
    cargarAjustes();
  }, []);

  const actualizarTema = async (tema: Tema) => {
    setAjustes(a => ({ ...a, tema }));
    await AsyncStorage.setItem(KEYS.tema, tema);
  };

  const actualizarMoneda = async (moneda: Moneda) => {
    setAjustes(a => ({ ...a, moneda }));
    await AsyncStorage.setItem(KEYS.moneda, moneda);
  };

  const actualizarDuracion = async (duracion: Duracion) => {
    setAjustes(a => ({ ...a, duracion }));
    await AsyncStorage.setItem(KEYS.duracion, duracion.toString());
  };

  return {
    ajustes,
    cargando,
    actualizarTema,
    actualizarMoneda,
    actualizarDuracion,
  };
}