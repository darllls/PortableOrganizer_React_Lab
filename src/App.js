import logo from './logo.svg';
import './App.css';

// src/App.js
import React, { useState } from 'react';
import Customer from './components/Customer';
import Orders from './components/Order';
import Suppliers from './components/Supplier';

const App = () => {
  const [activeTab, setActiveTab] = useState('customers');

  return (
    <div>
      <h1>Organizer App</h1>
      <div class>
        <button onClick={() => setActiveTab('customers')}>Customers</button>
        <button onClick={() => setActiveTab('orders')}>Orders</button>
        <button onClick={() => setActiveTab('suppliers')}>Suppliers</button>
      </div>

      {activeTab === 'customers' && <Customer />}
      {activeTab === 'orders' && <Orders />}
      {activeTab === 'suppliers' && <Suppliers />}
    </div>
  );
};

export default App;
