const dbConnection = require('../config/mysqlConfig');

let utilityDAO = {};

utilityDAO.selAllStatusList = () => {
    console.log('Inside Select All Status List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_status_id, s_status_description FROM status_list 
        WHERE ucase(b_status_flag) = 'Y'`, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

utilityDAO.selAllSareeTye = () => {
    console.log("Inside Sleect All Saree Type ");
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_saree_type, s_saree_type_description FROM saree_type 
        WHERE ucase(b_status_flag) ='Y'`, 
            (err, rows, fields) => {
                if(err) reject(err);
                resolve(rows);                    
        });
    });
}

module.exports = utilityDAO;