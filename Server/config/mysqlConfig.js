const mysql = require('mysql');

const db_connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Pass4MySQL@1866",
        database: "eztrack"
    }
);

const db_conn_pool = mysql.createPool (
    {
        host: "localhost",
        user: "root",
        password: "Pass4MySQL@1866",
        database: "eztrack" 
    }
);

module.exports = db_connection;
module.exports = db_conn_pool;
