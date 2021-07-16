const dbConnection = require('../config/mysqlConfig');

let weaverDAO = {};

weaverDAO.selActiveWeaverList = () => {
    console.log('Inside Select All Weaver List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_weaver,  s_weaver_name, s_weaver_location FROM weaver_list 
        WHERE ucase(b_active_flag) = 'Y'`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

weaverDAO.selInactiveWeaverList = () => {
    console.log('Inside Select All Weaver List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_weaver,  s_weaver_name, s_weaver_location FROM weaver_list 
        WHERE ucase(b_active_flag) = 'N'`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

weaverDAO.selWeaverByid = (data) => {
    console.log('Inside Select All Weaver List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_weaver,  s_weaver_name, s_weaver_location FROM weaver_list 
        WHERE id_weaver = ?`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

weaverDAO.insertWeaver = (data) => {
    console.log('Inside Adding Weaver List ');
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO weaver_list SET ?",
        data, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

weaverDAO.updateWeaver = (data) => {
    console.log('Inside Update Weaver List ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE weaver_list SET ?, t_updated_timestamp = current_timestamp() 
        WHERE id_weaver = ? `,
        [data, data.id_weaver], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = weaverDAO;