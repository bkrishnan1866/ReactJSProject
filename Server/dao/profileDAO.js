const dbConnection = require('../config/mysqlConfig');

let profileDAO = {};

profileDAO.select = (data) => {
    console.log('Inside Profile Class');
    return new Promise((resolve, reject) => {
        dbConnection.query("SELECT * FROM profile", 
            (err, rows, fields) => {
                if(err) reject(err);
                resolve(rows);
        });
    });    
}

profileDAO.selectProfileList = () => {
    console.log('Inside Profile Class');
    return new Promise((resolve, reject) => {
        dbConnection.query("SELECT s_login_id, s_name FROM profile", 
            (err, rows, fields) => {
                if(err) reject(err);
                resolve(rows);
        });
    });    
}

module.exports = profileDAO;