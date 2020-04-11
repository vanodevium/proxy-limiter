require('dotenv').config();

const config = require('./config');

const Redis = require("async-redis");
const redis = Redis.createClient(config.redis);

const ProxyAgent = require('proxy-agent');
const uuid = require('uuid/v4');

const settings = require('./settings');

module.exports = {
    * beforeSendRequest(requestDetail) {
        const requestOptions = requestDetail.requestOptions;
        const project = requestOptions.headers[config.proxy.projectHeader];
        delete requestOptions.headers[config.proxy.projectHeader];

        if (!project || isNaN(settings.limits[project])) {
            return returnProjectHeaderRequiredResponse();
        }

        return new Promise((resolve) => {
            ;(async () => {
                const length = (await keys(project)).length;
                if (settings.limits[project] && length >= settings.limits[project]) {
                    resolve(returnBlockResponse());
                }
                requestOptions.project = project;
                requestOptions.agent = new ProxyAgent(settings.mapping[project]);
                requestOptions.uuid = uuid();
                set(requestOptions);
                resolve({
                    requestOptions: requestOptions,
                });
            })();
        });
    },
    * beforeSendResponse(requestDetail, responseDetail) {
        requestDetail.requestOptions && del(requestDetail.requestOptions);
        return {
            response: responseDetail.response
        }
    },
    * onError(requestDetail) {
        requestDetail.requestOptions && del(requestDetail.requestOptions);
    },
    * onConnectError(requestDetail) {
        requestDetail.requestOptions && del(requestDetail.requestOptions);
    }
};

function keys(project) {
    return redis.keys(`${project}*`);
}

function set(requestOptions) {
    redis.set([requestOptions.project, requestOptions.uuid].join(':'), '', 'EX', config.proxy.ttl);
}

function del(requestOptions) {
    redis.del([requestOptions.project, requestOptions.uuid].join(':'));
}

function returnBlockResponse() {
    return returnBasicResponse();
}

function returnProjectHeaderRequiredResponse() {
    return returnBasicResponse(true);
}

function returnBasicResponse(header) {
    return {
        response: {
            statusCode: 418,
            header: {'Content-Type': 'application/json'},
            body: header ? `Set project slug via header ${config.proxy.projectHeader}\n` : '',
        }
    };
}