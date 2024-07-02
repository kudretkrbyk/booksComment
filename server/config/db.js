// db.js veya config/db.js dosyası

const sql = require("mssql");
require("dotenv").config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: true, // Windows Authentication kullanmak için bu seçeneği true yapın
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(config);
    console.log("SQL Server ile bağlantı kuruldu.");
  } catch (error) {
    console.error("Veritabanına bağlanırken hata oluştu:", error.message);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
};
