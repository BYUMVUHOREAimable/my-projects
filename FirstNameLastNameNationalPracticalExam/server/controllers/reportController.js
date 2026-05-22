const Product = require('../models/Product');
const ProductIn = require('../models/ProductIn');
const ProductOut = require('../models/ProductOut');

// @desc    Get stock status
// @route   GET /api/reports/stock-status
// @access  Private
exports.getStockStatus = async (req, res) => {
  try {
    const products = await Product.find();
    const stockStatus = await Promise.all(products.map(async (product) => {
      const totalIn = await ProductIn.aggregate([
        { $match: { productCode: product.productCode } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);

      const totalOut = await ProductOut.aggregate([
        { $match: { productCode: product.productCode } },
        { $group: { _id: null, total: { $sum: '$quantity' } } }
      ]);

      const availableStock = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      return {
        productCode: product.productCode,
        productName: product.productName,
        availableStock
      };
    }));

    res.json(stockStatus);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get stock movements
// @route   GET /api/reports/stock-movements
// @access  Private
exports.getStockMovements = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stockIn = await ProductIn.find(query).sort({ date: -1 });
    const stockOut = await ProductOut.find(query).sort({ date: -1 });

    res.json({
      stockIn,
      stockOut
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Download stock report
// @route   GET /api/reports/download
// @access  Private
exports.downloadStockReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stockIn = await ProductIn.find(query).sort({ date: -1 });
    const stockOut = await ProductOut.find(query).sort({ date: -1 });

    // Convert to CSV format
    let csv = 'Product Code,Product Name,Date,Quantity,Price,Total\n';
    
    // Add stock in records
    csv += 'Stock In\n';
    for (const record of stockIn) {
      const product = await Product.findOne({ productCode: record.productCode });
      csv += `${record.productCode},${product.productName},${record.date},${record.quantity},${record.uniquePrice},${record.totalPrice}\n`;
    }

    // Add stock out records
    csv += '\nStock Out\n';
    for (const record of stockOut) {
      const product = await Product.findOne({ productCode: record.productCode });
      csv += `${record.productCode},${product.productName},${record.date},${record.quantity},${record.uniquePrice},${record.totalPrice}\n`;
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=stock-report.csv');
    res.send(csv);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
}; 