// src/components/Supplier.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: '', email: '' });
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios.get('https://localhost:5000/api/suppliers')
      .then(response => setSuppliers(response.data))
      .catch(error => console.error('Error fetching suppliers', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const handleCreate = () => {
    axios.post('https://localhost:5000/api/suppliers', newSupplier)
      .then(() => {
        setNewSupplier({ name: '', email: '' });
        fetchSuppliers();
      })
      .catch(error => console.error('Error creating supplier', error));
  };

  const handleSelectSupplier = (supplier) => {
    setSelectedSupplier(supplier);
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupplier({ ...selectedSupplier, [name]: value });
  };

  const handleUpdate = () => {
    if (selectedSupplier) {
      axios.put(`https://localhost:5000/api/suppliers/${selectedSupplier.supplierId}`, selectedSupplier)
        .then(() => {
          setSelectedSupplier(null);
          fetchSuppliers();
        })
        .catch(error => console.error('Error updating supplier', error));
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://localhost:5000/api/suppliers/${id}`)
      .then(() => fetchSuppliers())
      .catch(error => console.error('Error deleting supplier', error));
  };

  return (
    <div>
      <h1>Supplier List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(supplier => (
            <tr key={supplier.supplierId}>
              <td>{supplier.name}</td>
              <td>{supplier.email}</td>
              <td>
                <button onClick={() => handleSelectSupplier(supplier)}>Update</button>
                <button onClick={() => handleDelete(supplier.supplierId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Create New Supplier</h2>
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={newSupplier.name} onChange={handleInputChange} />
        <label>Email: </label>
        <input type="text" name="email" value={newSupplier.email} onChange={handleInputChange} />        
        <button onClick={handleCreate}>Create</button>
      </div>

      
      {selectedSupplier && (
        <div>
          <h2>Update Supplier</h2>
          <label>Name: </label>
          <input type="text" name="name" value={selectedSupplier.name} onChange={handleUpdateInputChange} />
          <label>Email: </label>
          <input type="text" name="email" value={selectedSupplier.email} onChange={handleUpdateInputChange} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      )}
    </div>
  );
};

export default Supplier;
