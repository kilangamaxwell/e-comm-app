// import uuid library after installing uuid with "npm install uuid"
const { v4: uuid } = require("uuid");
//const { products } = require("../db");

// Define mutation operations to be exported
exports.Mutation = {
  // Define addCategory - use input as argurments, categories as the context
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuid(),
      name,
    };

    // push added category to the database
    db.categories.push(newCategory);
    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, description, quantity, price, onSale, image, categoryId } =
      input;
    const newProduct = {
      id: uuid(),
      name,
      description,
      quantity,
      price,
      onSale,
      image,
      categoryId,
    };
    if (newProduct.categoryId === "Kitchen") {
      newProduct.categoryId = "c01b1ff4-f894-4ef2-b27a-22aacc2fca70";
    }
    if (newProduct.categoryId === "Garden") {
      newProduct.categoryId = "34115aac-0ff5-4859-8f43-10e8db23602b";
    }
    if (newProduct.categoryId === "Sports") {
      newProduct.categoryId = "d914aec0-25b2-4103-9ed8-225d39018d1d";
    }
    if (newProduct.categoryId === "Office") {
      newProduct.categoryId === "f192bf6d-16a0-49ab-8d52-1d0c7ee145d3";
    }
    db.products.push(newProduct);
    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productName } = input;

    var productId = uuid();

    db.products.forEach((product) => {
      if (product.name === productName) {
        productId = product.id;
      }
    });

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };
    db.reviews.push(newReview);
    return newReview;
  },

  /*deleteCategory: (parent, { input }, { categories }) => {
    const { id } = input;
    const index = categories.indexOf(id);
    categories.splice(index, 1);
    return true;
  },*/
};
