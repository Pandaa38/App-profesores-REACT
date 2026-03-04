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
  `);
}

export default db;