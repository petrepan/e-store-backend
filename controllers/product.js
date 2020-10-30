const Product = require("../models/Products");

const getProducts = async (req, res) => {
  try {
      console.log(req)
      const pageSize = 10;
      const page = Number(req.query.pageNumber) || 1;

      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: "i",
            },
          }
        : {};

      const count = await Product.countDocuments({ ...keyword });
      const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

     return res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
     return res.status(500).json(error.message)
  }
};

module.exports = {getProducts}
