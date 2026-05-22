const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');
const { format } = require('date-fns');
const { Parser } = require('json2csv');

// @desc    Get current stock status
// @route   GET /api/stock/status
// @access  Private
exports.getStockStatus = async (req, res) => {
  try {
    const products = await Product.find().sort({ productName: 1 });
    
    const stockStatus = await Promise.all(products.map(async (product) => {
      const stockIn = await ProductIn.aggregate([
        { $match: { productCode: product.productCode } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);
      
      const stockOut = await ProductOut.aggregate([
        { $match: { productCode: product.productCode } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);
      
      const totalIn = stockIn[0]?.total || 0;
      const totalOut = stockOut[0]?.total || 0;
      const currentStock = totalIn - totalOut;
      
      return {
        productCode: product.productCode,
        productName: product.productName,
        totalIn,
        totalOut,
        currentStock
      };
    }));
    
    res.json(stockStatus);
  } catch (error) {
    console.error('Error getting stock status:', error);
    res.status(500).json({ message: 'Error getting stock status' });
  }
};

// @desc    Get stock movement history
// @route   GET /api/stock/movements
// @access  Private
exports.getStockMovements = async (req, res) => {
  try {
    const stockIn = await ProductIn.find().sort({ date: -1 });
    const stockOut = await ProductOut.find().sort({ date: -1 });
    
    const movements = [
      ...stockIn.map(record => ({
        type: 'IN',
        date: record.date,
        productCode: record.productCode,
        quantity: record.quantity,
        uniquePrice: record.uniquePrice,
        totalPrice: record.totalPrice
      })),
      ...stockOut.map(record => ({
        type: 'OUT',
        date: record.date,
        productCode: record.productCode,
        quantity: record.quantity,
        uniquePrice: record.uniquePrice,
        totalPrice: record.totalPrice
      }))
    ].sort((a, b) => b.date - a.date);
    
    res.json(movements);
  } catch (error) {
    console.error('Error getting stock movements:', error);
    res.status(500).json({ message: 'Error getting stock movements' });
  }
};

// @desc    Download stock status report
// @route   GET /api/stock/status/download
// @access  Private
exports.downloadStockStatus = async (req, res) => {
  try {
    const stockStatus = await getStockStatus(req, res);
    
    const fields = [
      { label: 'Product Code', value: 'productCode' },
      { label: 'Product Name', value: 'productName' },
      { label: 'Total In', value: 'totalIn' },
      { label: 'Total Out', value: 'totalOut' },
      { label: 'Current Stock', value: 'currentStock' }
    ];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(stockStatus);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=stock-status-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error downloading stock status:', error);
    res.status(500).json({ message: 'Error downloading stock status' });
  }
};

// @desc    Download stock movements report
// @route   GET /api/stock/movements/download
// @access  Private
exports.downloadStockMovements = async (req, res) => {
  try {
    const movements = await getStockMovements(req, res);
    
    const fields = [
      { label: 'Type', value: 'type' },
      { label: 'Date', value: 'date' },
      { label: 'Product Code', value: 'productCode' },
      { label: 'Quantity', value: 'quantity' },
      { label: 'Unit Price', value: 'uniquePrice' },
      { label: 'Total Price', value: 'totalPrice' }
    ];
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(movements);
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=stock-movements-${format(new Date(), 'yyyy-MM-dd')}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error downloading stock movements:', error);
    res.status(500).json({ message: 'Error downloading stock movements' });
  }
}; 