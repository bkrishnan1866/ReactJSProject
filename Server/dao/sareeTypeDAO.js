const dbConnection = require('../config/mysqlConfig');

let sareeTypeDAO = {};

sareeTypeDAO.selActiveSareeType = () => {
    console.log('Inside Select All Saree Type');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_saree_type, s_saree_type_description 
        FROM saree_type WHERE ucase(b_active_flag) = 'Y'`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

sareeTypeDAO.selInActiveSareeType = () => {
    console.log('Inside Select All Saree Type');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_saree_type, s_saree_type_description 
        FROM saree_type WHERE ucase(b_active_flag) = 'N'`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

sareeTypeDAO.selSareeTypeById = (data) => {
    console.log('Inside Select Saree Type By Id');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_saree_type, s_saree_type_description 
            FROM saree_type WHERE id_saree_type = ?`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

sareeTypeDAO.insertSareeType = (data) => {
    console.log('Inside Adding Saree Type ');
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO saree_type SET ?",
        data, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

sareeTypeDAO.updateSareeType = (data) => {
    console.log('Inside Updating Saree Type ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE saree_type SET ?, t_updated_timestamp = current_timestamp() 
        WHERE id_saree_type = ? `,
        [data, data.id_saree_type], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}


module.exports = sareeTypeDAO;