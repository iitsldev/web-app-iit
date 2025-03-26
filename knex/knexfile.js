const connection = {
    host: process.env.DB_HOST || 'rds-theravado-com-iit.cdrks5iijrux.ap-southeast-1.rds.amazonaws.com',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'WSxpW29Gqz47QnQ',
    database: process.env.DB_NAME || 'dev_dn',
    port: process.env.DB_PORT || 3306,
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