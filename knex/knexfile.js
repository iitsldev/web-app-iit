const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const connection = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'dev_dn',
    port: process.env.DATABASE_PORT || 3306,
};

console.log("Connection:", connection);

module.exports = {
    development: {
        client: 'mysql2',
        connection: connection,
        migrations: { directory: './migrations' },
        useNullAsDefault: true,
    },
    production: {
        client: 'mysql2',
        connection: connection,
        migrations: { directory: './migrations' },
        useNullAsDefault: true,
    },
};