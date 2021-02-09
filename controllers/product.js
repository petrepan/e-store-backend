const Product = require("../models/Products");

//fetch all products, fetch by query

const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const search = req.query.search
      ? {
          name: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    //sort products in ascending or descending order
    const sortByAlphabet = () => {
      let sortObj = {};
      if (req.query.sort_by === "title-ascending") {
        sortObj = { name: 1 };
      } else if (req.query.sort_by === "title-descending") {
        sortObj = { name: -1 };
      } else {
        sortObj;
      }
      return sortObj;
    };

    const sortByPrice = () => {
      let sortObj = {};
      if (req.query.sort_by === "price-ascending") {
        sortObj = { price: 1 };
      } else if (req.query.sort_by === "price-descending") {
        sortObj = { price: -1 };
      } else {
        sortObj;
      }
      return sortObj;
    };

    const count = await Product.countDocuments({ ...search });
    const products = await Product.find({ ...search })
      .sort(sortByAlphabet())
      .sort(sortByPrice())
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// fetch single product
const getProductByName = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.params.name });
 
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//delete product
const deleteProduct = async () => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.json({ msg: "Product removed" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//create a product
const createProduct = async (req, res) => {
  let options = [];
  const {
    name,
    price,
    description,
    images,
    category,
    stock,
    optionType,
    optionName,
  } = req.body;
  options = { [optionType]: optionName };

  if (
    !name ||
    !price ||
    !description ||
    !images ||
    !category.length ||
    !stock ||
    !options
  ) {
    return res.status(200).json({ msg: "All field are required" });
  }

  if (isNaN(price)) {
    return res.status(200).json({ msg: "Price must be a number" });
  } else if (price && Number(price) < 1) {
    return res.status(200).json({ msg: "Price can't be less than 1" });
  }

  if (isNaN(stock)) {
    return res.status(200).json({ msg: "Stock must be a number" });
  } else if (stock && Number(stock) < 0) {
    return res.status(200).json({ msg: "Stock can't be less than 1" });
  }

  try {
    name.toLowerCase();
    const checkName = await Product.findOne({ name })
    
    if (checkName) {
      return res.status(200).json({msg: "This Product name exists already"})
    }
    const product = new Product({
      name,
      price,
      description,
      images,
      category,
      stock,
      options,
    });

    const newProduct = await product.save();

    return res.status(200).json(newProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

//update product
const updateProduct = async (req, res) => {
  const productId = req.params.id;

  const {
    name,
    price,
    description,
    images,
    category,
    stock,
    optionType,
    optionName,
  } = req.body;
  options = { [optionType]: optionName };

  const newProductDetails = {
    name,
    price,
    description,
    images,
    category,
    stock,
    options,
  };

  try {
    const currentProduct = await Product.findById(productId);
    if (!currentProduct) {
      return res.status(200).json({ msg: "No product was found" });
    }

    name.toLowerCase();

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: newProductDetails },
      { new: true }
    );
    return res.status(200).json(updateProduct);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getProducts,
  getProductByName,
  deleteProduct,
  createProduct,
  updateProduct,
};
