const { Pool } = require("pg");
const config = require("../config/config.json"); // Yapılandırma dosyasını dahil et

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

module.exports = pool;
