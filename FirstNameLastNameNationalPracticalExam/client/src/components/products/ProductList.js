import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import { useAuth } from '../../context/authContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stockInModal, setStockInModal] = useState(null);
  const [stockOutModal, setStockOutModal] = useState(null);
  const [stockForm, setStockForm] = useState({ quantity: '', price: '' });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await productService.getProducts();
      setProducts(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setError('');
        await productService.deleteProduct(id);
        setProducts(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStockForm(prev => ({ ...prev, [name]: value }));
  };

  const resetStockModal = () => {
    setStockForm({ quantity: '', price: '' });
    setStockInModal(null);
    setStockOutModal(null);
  };

  const handleStockIn = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await productService.addStockIn(stockInModal._id, {
        quantity: parseInt(stockForm.quantity),
        price: parseFloat(stockForm.price),
      });
      resetStockModal();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add stock in');
    }
  };

  const handleStockOut = async (e) => {
    e.preventDefault();
    try {
      const availableStock = (stockOutModal.stockIn || 0) - (stockOutModal.stockOut || 0);
      if (parseInt(stockForm.quantity) > availableStock) {
        setError('Quantity exceeds available stock.');
        return;
      }

      await productService.addStockOut(stockOutModal._id, {
        quantity: parseInt(stockForm.quantity),
        price: parseFloat(stockForm.price),
      });
      resetStockModal();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add stock out');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          to="/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add New Product
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock In</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Out</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Current Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!products || products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No products found. Add a product to get started.
                </td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{product.productCode}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.productName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.stockIn || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{product.stockOut || 0}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {(product.stockIn || 0) - (product.stockOut || 0)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setStockForm({ quantity: '', price: '' });
                          setStockInModal(product);
                        }}
                        className="text-green-600 hover:text-green-800"
                      >
                        Stock In
                      </button>
                      <button
                        onClick={() => {
                          setStockForm({ quantity: '', price: '' });
                          setStockOutModal(product);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Stock Out
                      </button>
                      <Link to={`/products/${product._id}`} className="text-blue-600 hover:text-blue-800">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Stock In Modal */}
      {stockInModal && (
        <StockModal
          title="Add Stock In"
          onClose={resetStockModal}
          onSubmit={handleStockIn}
          stockForm={stockForm}
          onChange={handleChange}
        />
      )}

      {/* Stock Out Modal */}
      {stockOutModal && (
        <StockModal
          title="Add Stock Out"
          onClose={resetStockModal}
          onSubmit={handleStockOut}
          stockForm={stockForm}
          onChange={handleChange}
          maxQuantity={(stockOutModal.stockIn || 0) - (stockOutModal.stockOut || 0)}
        />
      )}
    </div>
  );
};

const StockModal = ({ title, onClose, onSubmit, stockForm, onChange, maxQuantity }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-start pt-20 z-50">
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={stockForm.quantity}
            onChange={onChange}
            min="1"
            max={maxQuantity || undefined}
            required
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price per Unit</label>
          <input
            type="number"
            name="price"
            value={stockForm.price}
            onChange={onChange}
            min="0"
            step="0.01"
            required
            className="w-full mt-1 border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ProductList;
