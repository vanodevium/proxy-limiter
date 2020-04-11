require('dotenv').config();

const config = require('./config');

const AnyProxy = require('anyproxy');
const options = {
    port: config.proxy.port || 8001,
    rule: require('./rule'),
    webInterface: {
        enable: false,
    },
    forceProxyHttps: true,
    wsIntercept: false,
    silent: true,
};
const proxyServer = new AnyProxy.ProxyServer(options);

const settings = require('./settings');

;(async () => {
    const Parser = require('./models/Parser');
    const parsers = await Parser.query()
        .joinRelated('proxy')
        .select('parsers.slug', 'parsers.limit', 'proxy.ip');
    parsers.forEach((parser) => {
        settings.limits[parser.slug] = parser.limit;
        settings.mapping[parser.slug] = parser.ip;
    });
    proxyServer.on('ready', () => {
    });
    proxyServer.on('error', (e) => {
    });
    proxyServer.start();

    process.on('uncaughtException', processExit);
    process.on('unhandledRejection', processExit);
    process.on('SIGTERM', processExit);
    process.on('SIGINT', processExit);

    async function processExit() {
        await proxyServer.close();
        process.exit();
    }
})();