import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import AuthContext from '../../context/authContext';

const StockInForm = () => {
  const [formData, setFormData] = useState({
    productCode: '',
    quantity: '',
    uniquePrice: ''
  });
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getProducts(token);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    
    fetchProducts();
  }, [token]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await productService.addStockIn({
        ...formData,
        quantity: Number(formData.quantity),
        uniquePrice: Number(formData.uniquePrice)
      }, token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Stock In</h2>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCode">
            Product
          </label>
          <select
            id="productCode"
            name="productCode"
            value={formData.productCode}
            onChange={onChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product._id} value={product.productCode}>
                {product.productName} ({product.productCode})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={onChange}
            required
            min="1"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uniquePrice">
            Price per Unit
          </label>
          <input
            type="number"
            id="uniquePrice"
            name="uniquePrice"
            value={formData.uniquePrice}
            onChange={onChange}
            required
            min="0"
            step="0.01"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Record Stock In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockInForm;