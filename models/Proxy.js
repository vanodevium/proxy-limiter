const Model = require("./Model");

class ProxyModel extends Model {
    static tableName = 'proxies';

    static get idColumn() {
        return 'id';
    }
}

module.exports = ProxyModel;