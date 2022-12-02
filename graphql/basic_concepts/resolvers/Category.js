exports.Category = {
  products: ({ id }, { filter }, { db }) => {
    let categoryProducts = db.products.filter((product) => product.categoryId === id);

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        categoryProducts = categoryProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        categoryProducts = categoryProducts.filter((product) => product.avgRating >= filter.avgRating);
      }
    }

    return categoryProducts;
  }
}