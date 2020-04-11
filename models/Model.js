require('dotenv').config();

const {Model} = require('objection');
const Knex = require('knex');
const config = require('../config');

Model.knex(Knex('local' === process.env.APP_ENV ? config.sqlite : config.mysql));

module.exports = Model;