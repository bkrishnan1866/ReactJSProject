const mysql = require('mysql');

const db_connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "eztrack"
    }
);

const db_conn_pool = mysql.createPool (
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "eztrack" 
    }
);

module.exports = db_connection;
module.exports = db_conn_pool;
