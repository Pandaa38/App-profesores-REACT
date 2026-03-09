import { useColorScheme } from 'react-native';
import { useAjustesContext } from '../context/AjustesContext';
import { temaClaro, temaOscuro, Colores } from './colores';

export function useTheme(): Colores {
  const { ajustes } = useAjustesContext();
  const sistemaOscuro = useColorScheme() === 'dark';

  if (ajustes.tema === 'oscuro') return temaOscuro;
  if (ajustes.tema === 'claro') return temaClaro;
  return sistemaOscuro ? temaOscuro : temaClaro;
}