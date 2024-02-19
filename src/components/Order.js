// src/components/Order.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({ number: '', date: '', status: 0 });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('https://localhost:5000/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleCreate = () => {
    axios.post('https://localhost:5000/api/orders', {
      ...newOrder,
      date: new Date(newOrder.date).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
    })
      .then(() => {
        setNewOrder({ number: '', date: '', status: 0 });
        fetchOrders();
      })
      .catch(error => console.error('Error creating order', error));
  };
  
  const handleUpdate = () => {
    if (selectedOrder) {
      axios.put(`https://localhost:5000/api/orders/${selectedOrder.orderId}`, {
        ...selectedOrder,
        date: new Date(selectedOrder.date).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
      })
        .then(() => {
          setSelectedOrder(null);
          fetchOrders();
        })
        .catch(error => console.error('Error updating order', error));
    }
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedOrder({ ...selectedOrder, [name]: value });
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:5000/api/orders/${id}`)
      .then(() => fetchOrders())
      .catch(error => console.error('Error deleting order', error));
  };

  return (
    <div>
      <h1>Order List</h1>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.number}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.status === 0 ? 'New' : order.status === 1 ? 'In Progress' : 'Closed'}</td>
              <td>
                <button onClick={() => handleSelectOrder(order)}>Update</button>
                <button onClick={() => handleDelete(order.orderId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Order</h2>
      <div>
        <label>Number: </label>
        <input type="text" name="number" value={newOrder.number} onChange={handleInputChange} />
        <label>Date: </label>
        <input type="date" name="date" value={newOrder.date} onChange={handleInputChange} />
        <label>Status: </label>
        <select name="status" value={newOrder.status} onChange={handleInputChange}>
          <option value={0}>New</option>
          <option value={1}>In Progress</option>
          <option value={2}>Closed</option>
        </select>
        <button onClick={handleCreate}>Create</button>
      </div>

      {selectedOrder && (
        <div>
          <h2>Update Order</h2>
          <label>Number: </label>
          <input type="text" name="number" value={selectedOrder.number} onChange={handleUpdateInputChange} />
          <label>Date: </label>
          <input type="date" name="date" value={selectedOrder.date} onChange={handleUpdateInputChange} />
          <label>Status: </label>
          <select name="status" value={selectedOrder.status} onChange={handleUpdateInputChange}>
            <option value={0}>New</option>
            <option value={1}>In Progress</option>
            <option value={2}>Closed</option>
          </select>
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Order;
