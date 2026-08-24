import knex, { Knex } from 'knex';
import { Connection } from 'mysql2';

export const knexCe: Knex = knex({
    client: 'mysql2',
    connection: {
        user: 'root',
        database: 'db_ce',
        timezone: '-05:00',
        connectTimeout: 10000,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
        host: process.env.DB_CE_HOST,
        port: Number(process.env.DB_CE_PORT),
        password: process.env.DB_CE_PASSWORD,
    },
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
        afterCreate: (conn: Connection, done: (err: Error | null, conn: Connection) => void) => {
            conn.query('SET SESSION wait_timeout = 28800;', (error) => done(error, conn));
        }
    }
});
