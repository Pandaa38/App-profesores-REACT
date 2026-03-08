import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('profesores.db');

export function inicializarDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS alumnos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      
      nombre TEXT NOT NULL 
      CONSTRAINT chk_nombre_no_vacio CHECK (length(trim(nombre)) > 0),

      precioPorHora REAL NOT NULL 
      CONSTRAINT chk_precio_positivo CHECK (precioPorHora >= 0),

      horasPendientes REAL NOT NULL DEFAULT 0 
      CONSTRAINT chk_horas_positivas CHECK (horasPendientes >= 0)
    );

    CREATE TABLE IF NOT EXISTS pagos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      alumnoId INTEGER REFERENCES alumnos(id) ON DELETE SET NULL,

      alumnoNombre TEXT NOT NULL,

      horasCobradas REAL NOT NULL 
      CONSTRAINT chk_horas_cobradas CHECK (horasCobradas > 0),

      montoCobrado REAL NOT NULL 
      CONSTRAINT chk_monto_cobrado CHECK (montoCobrado > 0),

      fecha TEXT NOT NULL DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
    );

  `);
}

export default db;