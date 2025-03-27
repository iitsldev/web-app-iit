const connection = {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'admin',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'dev_dn',
    port: process.env.DATABASE_PORT || 3306,
}


module.exports = {
    development: {
        client: 'mysql2',
        connection: connection,
        migrations: {
            directory: './migrations'
        },
        useNullAsDefault: true
    },
    production: {
        client: 'mysql2',
        connection: connection,
        migrations: {
            directory: './migrations'
        },
        useNullAsDefault: true
    },
};

// // sqlite database
// const path = require('path');
// module.exports = {
//     development: {
//         client: 'sqlite3',
//         connection: {
//             filename: process.env.DATABASE_URL || '/tmp/iit.db'
//         },
//         migrations: {
//             directory: './migrations'
//         },
//         useNullAsDefault: true
//     }
// };