import sql from "mysql2/promise"

const pool = sql.createPool({
    host: '127.0.0.1',
    user: 'root',
    database: 'virgo_school',
    port: '3307'
})

export default pool