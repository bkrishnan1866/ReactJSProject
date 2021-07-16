const dbConnection = require('../config/mysqlConfig');

let statusDAO = {};

statusDAO.getStatusList = () => {
    console.log('Inside Status DAO ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`select id_status_id, s_status_description 
            from status_list where b_status_flag = 'Y'`,
            (error, rows, fields) => {
                if(console.error())
                    return reject(error);
                return resolve(rows);
            });
    });
}

module.exports = statusDAO;