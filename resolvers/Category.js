//const { reviews } = require("../db");
exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    const categoryProduct = db.products.filter(
      (product) => product.categoryId === id
    );
    let filterCategoryProducts = categoryProduct;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filterCategoryProducts = filterCategoryProducts.filter((product) => {
          return product.onSale;
        });
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterCategoryProducts = filterCategoryProducts.filter((product) => {
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
            return filterCategoryProducts;
          }
        });
      }
    }

    return filterCategoryProducts;
  },
};
