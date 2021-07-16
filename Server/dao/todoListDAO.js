const dbConnection = require('../config/mysqlConfig');

let todoListDAO = {};

todoListDAO.selAllUnArchivedTodoList = () => {
    console.log('Inside Select All Todo List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_todo_id, s_todo_txt, s_todo_assigned, b_todo_status, 
        b_archive, (SELECT s_name FROM profile WHERE s_login_id = todo_list.s_todo_assigned) 
        AS assignedTo FROM todo_list WHERE id_todo_id >= 10000 AND ucase(b_archive) = 'N'`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

todoListDAO.selTodoFollowUp = (data) => {
    console.log('Inside Select All Todo List');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_todo_id, s_todo_txt, s_todo_assigned, b_todo_status, 
        b_archive, (SELECT s_name FROM profile WHERE s_login_id = todo_list.s_todo_assigned) 
        AS assignedTo FROM todo_list WHERE id_todo_id >= 10000 AND 
        ucase(b_archive) = 'N' AND ?`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

todoListDAO.insertTodoList = (data) => {
    console.log('Inside Adding Todo List ');
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO todo_list SET ?",
        data, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

todoListDAO.updateTodoList = (data) => {
    console.log('Inside Updating Todo List ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE todo_list SET ?, t_updated_timestamp = current_timestamp() 
        WHERE id_todo_id = ? `,
        [data, data.id_todo_id], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = todoListDAO;