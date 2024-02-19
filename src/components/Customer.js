// src/components/Customer.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', orderNumber: 0 });
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('https://localhost:5000/api/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.error('Error fetching customers', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const handleCreate = () => {
    axios.post('https://localhost:5000/api/customers', newCustomer)
      .then(() => {
        setNewCustomer({ name: '', phone: '', orderNumber: 0 });
        fetchCustomers();
      })
      .catch(error => console.error('Error creating customer', error));
  };

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCustomer({ ...selectedCustomer, [name]: value });
  };

  const handleUpdate = () => {
    if (selectedCustomer) {
      axios.put(`https://localhost:5000/api/customers/${selectedCustomer.customerId}`, selectedCustomer)
        .then(() => {
          setSelectedCustomer(null);
          fetchCustomers();
        })
        .catch(error => console.error('Error updating customer', error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:5000/api/customers/${id}`)
      .then(() => fetchCustomers())
      .catch(error => console.error('Error deleting customer', error));
  }

  return (
    <div>
      <h1>Customer List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Order Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.customerId}>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.orderNumber}</td>
              <td>
                <button onClick={() => handleSelectCustomer(customer)}>Update</button>
                <button onClick={() => handleDelete(customer.customerId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Customer</h2>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={newCustomer.name} onChange={handleInputChange} />
        <label>Phone: </label>
        <input type="text" name="phone" value={newCustomer.phone} onChange={handleInputChange} />
        <label>Order Number: </label>
        <input type="number" name="orderNumber" value={newCustomer.orderNumber} onChange={handleInputChange} />
        <button onClick={handleCreate}>Create</button>
      </div>

      
      {selectedCustomer && (
        <div>
          <h2>Update Customer</h2>
          <label>Name: </label>
          <input type="text" name="name" value={selectedCustomer.name} onChange={handleUpdateInputChange} />
          <label>Phone: </label>
          <input type="text" name="phone" value={selectedCustomer.phone} onChange={handleUpdateInputChange} />
          <label>Order Number: </label>
          <input type="number" name="orderNumber" value={selectedCustomer.orderNumber} onChange={handleUpdateInputChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Customer;
