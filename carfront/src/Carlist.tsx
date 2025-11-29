import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export default function CarCRUD() {
  const [cars, setCars] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [newCar, setNewCar] = useState({
    brand: '', model: '', color: '', registrationNumber: '', modelYear: '', price: ''
  });
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      console.log('Fetching from:', `${API_BASE_URL}/cars`);
      const response = await fetch(`${API_BASE_URL}/cars`);
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Fetched cars:', data);
      setCars(data);
    } catch (err) {
      console.error('Error fetching cars:', err);
      alert('Failed to fetch cars: ' + err.message);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch(`${API_BASE_URL}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newCar,
          modelYear: parseInt(newCar.modelYear),
          price: parseInt(newCar.price)
        })
      });
      setNewCar({ brand: '', model: '', color: '', registrationNumber: '', modelYear: '', price: '' });
      setShowAdd(false);
      fetchCars();
    } catch (err) {
      console.error('Error creating car:', err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/cars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editRow)
      });
      setEditRow(null);
      fetchCars();
    } catch (err) {
      console.error('Error updating car:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this car?')) return;
    try {
      await fetch(`${API_BASE_URL}/cars/${id}`, { method: 'DELETE' });
      fetchCars();
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'brand', headerName: 'Brand', width: 130, editable: true },
    { field: 'model', headerName: 'Model', width: 130, editable: true },
    { field: 'color', headerName: 'Color', width: 110, editable: true },
    { field: 'registrationNumber', headerName: 'Registration', width: 150, editable: true },
    { field: 'modelYear', headerName: 'Year', width: 90, editable: true },
    { field: 'price', headerName: 'Price', width: 110, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-2">
          {editRow?.id === params.row.id ? (
            <>
              <button
                onClick={() => handleUpdate(params.row.id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditRow(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditRow({ ...params.row })}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(params.row.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  const processRowUpdate = (newRow) => {
    setEditRow(newRow);
    return newRow;
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Car Database</h1>
        
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {showAdd ? 'Cancel' : 'Add New Car'}
        </button>

        {showAdd && (
          <div className="mb-6 p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <input
                placeholder="Brand"
                value={newCar.brand}
                onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                placeholder="Model"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                placeholder="Color"
                value={newCar.color}
                onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                placeholder="Registration"
                value={newCar.registrationNumber}
                onChange={(e) => setNewCar({ ...newCar, registrationNumber: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Year"
                value={newCar.modelYear}
                onChange={(e) => setNewCar({ ...newCar, modelYear: e.target.value })}
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={newCar.price}
                onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                className="px-3 py-2 border rounded"
              />
            </div>
            <button
              onClick={handleCreate}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create Car
            </button>
          </div>
        )}

        <div className="bg-white rounded shadow" style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={cars}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
            loading={loading}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </div>
  );
}