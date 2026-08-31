import dotenv from 'dotenv';
dotenv.config();

const engine = process.env.DB_ENGINE;
let pool;

if (engine === "mysql") {
    const mysql = await import("mysql2/promise");

    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    pool.query = pool.execute.bind(pool);
    console.log("🟡 MySQL activo");
}

if (engine === "postgres") {
    const pkg = await import("pg");
    const { Pool } = pkg.default;

    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    console.log("🟢 PostgreSQL (Supabase) activo");
}

export default pool;