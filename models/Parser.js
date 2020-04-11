const Model = require("./Model");

class ParserModel extends Model {
    static tableName = 'parsers';

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        const ProxyModel = require('./Proxy');
        return {
          proxy: {
            relation: Model.BelongsToOneRelation,
            modelClass: ProxyModel,
            join: {
              from: 'parsers.proxy_id',
              to: 'proxies.id'
            }
          }
        }
    };
}

module.exports = ParserModel;