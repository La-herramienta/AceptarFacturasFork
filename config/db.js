// db.js
import sql from "mssql";

const config = {
  user: "sa",
  password: "LazUnico93Net",
  server: "186.119.127.191",
  database: "DISTRI_LA_HERRAMIENTA",
  options: {
    encrypt: false, // Cambia esto a true si tu servidor SQL Server requiere encriptación
    enableArithAbort: true,
    trustServerCertificate: true, // Solo si estás en un entorno de desarrollo
  },
  pool: {
    max: 5,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  port: 1433, // Puerto por defecto para SQL Server, puedes cambiarlo si es necesario
};

let poolPromise;

const getPool = async () => {
  if (!poolPromise) {
    poolPromise = sql
      .connect(config)
      .then((pool) => {
        console.log("Connected to SQL Server");
        return pool;
      })
      .catch((err) => {
        console.error("Database connection failed! Bad config: ", err);
        poolPromise = null; // Reset poolPromise if connection fails
        throw err;
      });
  }
  return poolPromise;
};

export default getPool;
