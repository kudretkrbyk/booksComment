const mssql = require("mssql");

const config = {
  server: "(LocalDb)/MSSQLLocalDB", // SQL Server sunucu adı
  port: 1433, // SQL Server bağlantı noktası
  database: "books", // Bağlanmak istediğiniz veritabanı adı
  // user ve password parametreleri kaldırıldı
};

mssql.connect(config, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log("SQL Server bağlantısı kuruldu.");

  // Bağlantı kurulduktan sonra SQL sorgularınızı çalıştırabilirsiniz.

  const request = new mssql.Request();
  request.query("SELECT * FROM myTable", (err, result) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(result);
  });
});
