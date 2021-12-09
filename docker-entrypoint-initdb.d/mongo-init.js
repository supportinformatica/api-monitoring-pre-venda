db = new Mongo().getDB('api_monitoring_pre_venda');

db.createCollection('users', { capped: false });
