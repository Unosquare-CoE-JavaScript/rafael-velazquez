exports.Query = {
  hello: () => 'Hello world!!!',
  products: (_parent, { filter }, { db }) => {
    let filterProducts = db.products;

    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale) {
        filterProducts = filterProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filterProducts = filterProducts.filter((product) => product.avgRating >= filter.avgRating);
      }
    }

    return filterProducts;
  },
  product: (_parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (_parent, args, { db }) => {
    return db.categories;
  },
  category: (_parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  }
}