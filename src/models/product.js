const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/path");
const { deleteProductFromCart } = require("./cart");

const productsFilePath = path.join(rootDir, "src", "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(productsFilePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

const addProduct = (product) => {
  const newProduct = {
    title: product.title,
    imageUrl: product.imageUrl,
    price: product.price,
    description: product.description,
    id: Math.random().toString()
  };
  
  getProductsFromFile((products) => {
    products.push(newProduct);
    fs.writeFile(productsFilePath, JSON.stringify(products), (err) => {
      console.log(err);
    });
  });
};

const editProduct = (updatedProduct) => {
  getProductsFromFile((products) => {
    const updatedProducts = products.map((product) => {
      if (product.id === updatedProduct.id) {
        return updatedProduct;
      } else {
        return product;
      }
    });
    fs.writeFile(productsFilePath, JSON.stringify(updatedProducts), (err) => {
      console.log(err);
    });
  });
};

const deleteProduct = (productId, productPrice) => {
  getProductsFromFile((products) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    fs.writeFile(productsFilePath, JSON.stringify(updatedProducts), (err) => {
      if (!err) {
        deleteProductFromCart(productId, productPrice);
      }
    });
  });
};

const fetchAllProducts = (cb) => {
  getProductsFromFile(cb);
};

const findProductById = (id, cb) => {
  getProductsFromFile((products) => {
    const product = products.find((product) => product.id === id);
    cb(product);
  });
};

module.exports = {
  addProduct,
  editProduct,
  fetchAllProducts,
  findProductById,
  deleteProduct
};
