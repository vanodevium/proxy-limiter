require('dotenv').config();

module.exports = {
    "proxy": {
        "port": process.env.PROXY_PORT || 8001,
        "ttl": process.env.PROXY_TTL || 30, // TTL in seconds
        "projectHeader": process.env.PROXY_HEADER || 'x-project',
    },
    "sqlite": {
        client: 'sqlite',
        connection: {
            filename: 'database.sqlite',
        },
        useNullAsDefault: true,
    },
    "mysql": {
        client: 'mysql2',
        useNullAsDefault: true,
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        pool: {
            min: 0,
            max: 7,
        },
    },
    "redis": {
        host: process.env.REDIS_HOST || "localhost",
        port: process.env.REDIS_PORT || 6379,
        db: process.env.REDIS_DB || 0,
    }
};