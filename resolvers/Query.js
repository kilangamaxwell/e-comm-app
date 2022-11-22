//const { reviews } = require("../db");

exports.Query = {
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating, priceLimit } = filter;
      if (onSale) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.onSale;
        });
      }
      if (priceLimit !== null) {
        filteredProducts = filteredProducts.filter((product) => {
          if (product.price <= priceLimit) {
            return filteredProducts;
          }
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numOfReviews = 0;
          db.reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numOfReviews++;
            }
          });
          const avgProductRating = sumRating / numOfReviews;
          if (avgProductRating >= avgRating) {
            return filteredProducts;
          }
        });
      }
    }

    return filteredProducts;
  },
  product: (parent, args, { db }) => {
    return db.products.find((product) => product.id === args.id);
  },

  categories: (parent, args, { db }) => {
    return db.categories;
  },
  category: (parent, args, { db }) => {
    return db.categories.find((category) => category.id === args.id);
  },
};
