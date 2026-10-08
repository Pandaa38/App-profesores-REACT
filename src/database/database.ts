import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('profesores.db');

export function inicializarDB() {
  db.execSync('PRAGMA foreign_keys = ON;');
  
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

    CREATE TABLE IF NOT EXISTS dias_laborables (
      id INTEGER PRIMARY KEY,
      habilitado INTEGER NOT NULL DEFAULT 1
    );

    INSERT OR IGNORE INTO dias_laborables (id, habilitado) VALUES 
    (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 0), (7, 0);

    CREATE TABLE IF NOT EXISTS horarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      alumno_id INTEGER NOT NULL REFERENCES alumnos(id) ON DELETE CASCADE,
      dia_id INTEGER NOT NULL REFERENCES dias_laborables(id),
      hora_inicio TEXT NOT NULL,
      hora_fin TEXT NOT NULL,
      CONSTRAINT chk_dia_valido CHECK (dia_id BETWEEN 1 AND 7),
      CONSTRAINT chk_rango_horas CHECK (hora_inicio < hora_fin)
    );

    CREATE TABLE IF NOT EXISTS notas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      horario_id INTEGER NOT NULL REFERENCES horarios(id) ON DELETE CASCADE,
      texto TEXT NOT NULL,
      fecha TEXT,
      permanente INTEGER NOT NULL DEFAULT 0
    );
  `);
}

inicializarDB();

export default db;