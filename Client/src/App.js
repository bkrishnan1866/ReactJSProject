import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserContextProvider from './context/UserContext';
import Login from './component/login/login';

import Weaver from './component/weaver/weaver';
import WeaverEditForm from './component/weaver/weaverEditForm';
import WeaverAddForm from './component/weaver/weaverAddForm';

import Saree from './component/sareetype/sareeType';
import SareeEditForm from './component/sareetype/sareeEditForm';
import SareeAddForm from './component/sareetype/sareeAddForm';
import OrderDetailsAddForm from './component/order/orderDetailsAddForm';
import OrderDetailsEditForm from './component/order/orderDetailsEditForm'
import TodoForm from './component/todo/todoForm';
import ShipmentAddForm from './component/shipment/shipmentAddForm';
import ShipmentCartProvider from './context/ShipmentCartContext';
import ShipmentEditForm from './component/shipment/shipmentEditForm';
import ShipmentCartList from './component/shipment/shipmentCartList';
import OrderListByStatus from './component/order/orderListByStatus';
import Dashboard from './component/layout/dashboard';
import Header from './component/layout/header';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div>
          <Switch>
            <UserContextProvider>
              <Route path="/" exact component={Login} />
              <Route path="/weaver" exact component={Weaver} />
              <Route path="/weaver/update/:id" exact component={WeaverEditForm} />
              <Route path="/weaver/add" exact component={WeaverAddForm} />
              <Route path="/saree" exact component={Saree} />
              <Route path="/saree/update/:id" exact component={SareeEditForm} />
              <Route path="/saree/add" exact component={SareeAddForm} />
              <Route path="/order/update/:id" exact component={OrderDetailsEditForm} />
              <Route path="/order/add" exact component={OrderDetailsAddForm} />
              <Route path="/todo/" exact component={TodoForm} />
              <ShipmentCartProvider>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/order/status/:id" exact component={OrderListByStatus} />
                <Route path="/shipment/add" exact component={ShipmentAddForm} />
                <Route path="/shipment/cart/" exact component={ShipmentCartList} />
                <Route path="/shipment/edit/:id" exact component={ShipmentEditForm} />
              </ShipmentCartProvider>
            </UserContextProvider>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
