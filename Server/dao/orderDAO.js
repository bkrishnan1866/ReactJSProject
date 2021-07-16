const dbConnection = require('../config/mysqlConfig');

let orderDAO = {};

orderDAO.selOrderById = (data) => {
    console.log('Inside Select Order By Id');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_order, s_customer_name, s_customer_city,
                s_customer_country, b_customer_vip, b_paid,
                id_weaver, id_saree_type, d_weaver_price,
                d_retail_price, d_other_cost, d_revenue,
                id_status_id,
                DATE_FORMAT(t_ordered_date, '%Y-%m-%d') AS t_ordered_date,  
                DATE_FORMAT(t_cancelled_date, '%Y-%m-%d') AS t_cancelled_date,
                s_cancel_reason, b_feedback, s_comment,
                s_image_url
            FROM order_details WHERE id_order = ?`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

orderDAO.selAllOrdersByStatus = (data) => {
    console.log('Inside Select All Order By Status');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`select id_order, s_customer_name, s_customer_city,
        (select s_weaver_name from weaver_list weaver where ord.id_weaver = weaver.id_weaver) 
        as s_weaver_name, 
        (select s_saree_type_description from saree_type saree 
            where ord.id_saree_type = saree.id_saree_type) as s_saree_type_description, 
        id_saree_type, d_retail_price, s_image_url
        from order_details ord where id_status_id = 100;`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

orderDAO.insertOrder = (data) => {
    console.log('Inside Adding Order ');
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO order_details SET ?",
        data, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

orderDAO.updateOrder = (data) => {
    console.log('Inside Updating Order ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE order_details SET ?, t_updated_timestamp = current_timestamp() 
        WHERE id_order = ? `,
        [data, data.id_order], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = orderDAO;