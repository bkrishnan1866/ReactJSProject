const dbConnection = require('../config/mysqlConfig');

let shipmentDAO = {};

shipmentDAO.selShipmentById = (data) => {
    console.log('Inside Select Shipment by Order Id ');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`SELECT id_shipment,
        s_shipment_sent_by, s_shipment_sent_to, s_shipment_loc_from, s_shipment_loc_to,
        s_tracking_num, 
        DATE_FORMAT(t_shipment_start_date, '%Y-%m-%d') as t_shipment_start_date, 
        DATE_FORMAT(t_expected_delivery_date, '%Y-%m-%d') as t_expected_delivery_date, 
        DATE_FORMAT(t_delivered_date, '%Y-%m-%d') as t_delivered_date,
        d_shipment_cost, b_shipment_status
    FROM shipment where id_shipment = ?`,
        data,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });

}

shipmentDAO.selCustDetailsByOrderIds = (data) => {
    console.log('Inside Select Shipment by Order Ids ' + data);
    const queryData = data.split(',');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`select distinct s_customer_name as name, s_customer_city as location 
            from order_details where id_order in (?)`,
            [queryData],
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });

}

shipmentDAO.selWeaverDetailsByOrderIds = (data) => {
    console.log('Inside Select Shipment by Order Ids ');
    const queryData = data.split(',');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`select distinct s_weaver_name as name, s_weaver_location as location 
        from order_details ord, weaver_list wvr where ord.id_weaver = wvr.id_weaver 
        and id_order in (?)`,
        [queryData],
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });

}

shipmentDAO.selProfileDetails = () => {
    console.log('Inside Select Shipment by Order Ids ');
    return new Promise ((resolve, reject) => {
        dbConnection.query(`select s_name as name, s_location as location from profile`,
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });

}

shipmentDAO.insertShipment = (data) => {
    console.log('Inside Adding Shipment ');
    return new Promise((resolve, reject) => {
        dbConnection.query("INSERT INTO shipment SET ?",
        data, 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

shipmentDAO.updateShipment = (data) => {
    console.log('Inside Updating Shipment ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`UPDATE shipment SET ?, t_updated_timestamp = current_timestamp() 
        WHERE id_shipment = ? `,
        [data, data.id_shipment], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

shipmentDAO.updateOrder = (data) => {
    console.log('Inside Updating Shipment - Order : ');
    return new Promise((resolve, reject) => {
        dbConnection.query(`update order_details set 
        id_shipment = (select max(id_shipment) from shipment) 
        where id_order in (?) `,
        [data], 
        (err, rows, fields) => {
            if(err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = shipmentDAO;