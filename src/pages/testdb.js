// Prisma setup
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// MySQL pure queries setup
import mysql from 'mysql2/promise';

connection = {
    host: process.env.DB_HOST || 'rds-theravado-com-iit.cdrks5iijrux.ap-southeast-1.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'WSxpW29Gqz47QnQ',
    database: process.env.DB_NAME || 'dev_dn',
    port: process.env.DB_PORT || 3306,
}

const mysqlPool = mysql.createPool(connection);

// Knex setup
import knex from 'knex';
const knexDb = knex({
    client: 'mysql2',
    connection: connection,
});

export async function getServerSideProps() {
    const logs = [];
    let mysqlConn;

    const log = (message) => {
        logs.push(`${new Date().toISOString()} - ${message}`);
    };

    try {
        // PRISMA OPERATIONS
        log('\n=== Starting Prisma Operations ===');
        try {
            log('Prisma: Attempting to connect...');
            await prisma.$connect();
            log('Prisma: Database connected successfully');

            // Prisma Create
            const prismaCreateStart = performance.now();
            const prismaCreated = await prisma.mission.create({
                data: {
                    image: 'test-image-prisma.jpg',
                    text: 'Test mission Prisma text',
                },
            });
            const prismaCreateTime = performance.now() - prismaCreateStart;
            log(`Prisma: Created Mission in ${prismaCreateTime}ms: ${JSON.stringify(prismaCreated)}`);

            // Prisma Read
            const prismaReadStart = performance.now();
            const prismaMissions = await prisma.mission.findMany();
            const prismaReadTime = performance.now() - prismaReadStart;
            log(`Prisma: Found ${prismaMissions.length} Missions in ${prismaReadTime}ms`);

            // Prisma Update
            const prismaUpdateStart = performance.now();
            const prismaUpdated = await prisma.mission.update({
                where: { id: prismaCreated.id },
                data: { text: 'Updated Prisma text' },
            });
            const prismaUpdateTime = performance.now() - prismaUpdateStart;
            log(`Prisma: Updated Mission in ${prismaUpdateTime}ms: ${JSON.stringify(prismaUpdated)}`);

            // Prisma Delete
            const prismaDeleteStart = performance.now();
            const prismaDeleted = await prisma.mission.delete({
                where: { id: prismaCreated.id },
            });
            const prismaDeleteTime = performance.now() - prismaDeleteStart;
            log(`Prisma: Deleted Mission in ${prismaDeleteTime}ms: ${JSON.stringify(prismaDeleted)}`);
        } catch (prismaError) {
            log(`Prisma Error: ${prismaError.message}`);
        } finally {
            await prisma.$disconnect();
        }

        // PURE MYSQL OPERATIONS
        log('\n=== Starting Pure MySQL Operations ===');
        mysqlConn = await mysqlPool.getConnection();
        log('MySQL: Database connected successfully');

        // MySQL Create
        log('MySQL: Creating a Mission record...');
        const mysqlCreateStart = performance.now();
        const [mysqlCreateRes] = await mysqlConn.query(
            'INSERT INTO missions (image, text) VALUES (?, ?)',
            ['test-image-mysql.jpg', 'Test mission MySQL text']
        );
        const [mysqlCreated] = await mysqlConn.query(
            'SELECT * FROM missions WHERE id = LAST_INSERT_ID()'
        );
        const mysqlCreateTime = performance.now() - mysqlCreateStart;
        log(`MySQL: Created Mission in ${mysqlCreateTime}ms: ${JSON.stringify(mysqlCreated[0])}`);

        // MySQL Read
        const mysqlReadStart = performance.now();
        const [mysqlReadRes] = await mysqlConn.query('SELECT * FROM missions');
        const mysqlReadTime = performance.now() - mysqlReadStart;
        log(`MySQL: Found ${mysqlReadRes.length} Missions in ${mysqlReadTime}ms`);

        // MySQL Update
        const mysqlUpdateStart = performance.now();
        const [mysqlUpdateRes] = await mysqlConn.query(
            'UPDATE missions SET text = ? WHERE id = ?',
            ['Updated MySQL text', mysqlCreated[0].id]
        );
        const [mysqlUpdated] = await mysqlConn.query(
            'SELECT * FROM missions WHERE id = ?',
            [mysqlCreated[0].id]
        );
        const mysqlUpdateTime = performance.now() - mysqlUpdateStart;
        log(`MySQL: Updated Mission in ${mysqlUpdateTime}ms: ${JSON.stringify(mysqlUpdated[0])}`);

        // MySQL Delete
        const mysqlDeleteStart = performance.now();
        const [mysqlDeleteRes] = await mysqlConn.query(
            'DELETE FROM missions WHERE id = ?',
            [mysqlCreated[0].id]
        );
        const mysqlDeleteTime = performance.now() - mysqlDeleteStart;
        log(`MySQL: Deleted Mission in ${mysqlDeleteTime}ms`);

        // KNEX OPERATIONS
        log('\n=== Starting Knex Operations ===');

        // Knex Create
        log('Knex: Creating a Mission record...');
        const knexCreateStart = performance.now();
        const knexCreatedIds = await knexDb('missions')
            .insert({ image: 'test-image-knex.jpg', text: 'Test mission Knex text' });
        const knexCreated = await knexDb('missions')
            .where('id', knexCreatedIds[0])
            .first();
        const knexCreateTime = performance.now() - knexCreateStart;
        log(`Knex: Created Mission in ${knexCreateTime}ms: ${JSON.stringify(knexCreated)}`);

        // Knex Read
        const knexReadStart = performance.now();
        const knexMissions = await knexDb('missions').select('*');
        const knexReadTime = performance.now() - knexReadStart;
        log(`Knex: Found ${knexMissions.length} Missions in ${knexReadTime}ms`);

        // Knex Update
        const knexUpdateStart = performance.now();
        await knexDb('missions')
            .where({ id: knexCreated.id })
            .update({ text: 'Updated Knex text' });
        const knexUpdated = await knexDb('missions')
            .where({ id: knexCreated.id })
            .first();
        const knexUpdateTime = performance.now() - knexUpdateStart;
        log(`Knex: Updated Mission in ${knexUpdateTime}ms: ${JSON.stringify(knexUpdated)}`);

        // Knex Delete
        const knexDeleteStart = performance.now();
        await knexDb('missions')
            .where({ id: knexCreated.id })
            .del();
        const knexDeleteTime = performance.now() - knexDeleteStart;
        log(`Knex: Deleted Mission in ${knexDeleteTime}ms`);

        // Performance Comparison
        log('\n=== Performance Comparison ===');
        log(`Create: Prisma (${prismaCreateTime || 'N/A'}ms) vs MySQL (${mysqlCreateTime}ms) vs Knex (${knexCreateTime}ms)`);
        log(`Read: Prisma (${prismaReadTime || 'N/A'}ms) vs MySQL (${mysqlReadTime}ms) vs Knex (${knexReadTime}ms)`);
        log(`Update: Prisma (${prismaUpdateTime || 'N/A'}ms) vs MySQL (${mysqlUpdateTime}ms) vs Knex (${knexUpdateTime}ms)`);
        log(`Delete: Prisma (${prismaDeleteTime || 'N/A'}ms) vs MySQL (${mysqlDeleteTime}ms) vs Knex (${knexDeleteTime}ms)`);

    } catch (error) {
        log(`Error: ${error.message}`);
        log('Stack trace: ' + error.stack);
    } finally {
        if (mysqlConn) mysqlConn.release();
        await knexDb.destroy();
        await prisma.$disconnect();
        log('All database connections closed');
    }

    return {
        props: {
            logs,
        },
    };
}

export default function TestDB({ logs }) {
    return (
        <div>
            <h1>Database Test Page (Mission Table)</h1>
            <h2>Logs:</h2>
            <pre>{logs.join('\n')}</pre>
        </div>
    );
}