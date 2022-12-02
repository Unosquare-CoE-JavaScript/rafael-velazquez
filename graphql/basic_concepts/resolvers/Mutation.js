const { v4: uuid } = require('uuid');

exports.Mutation = {
  addCategory: (_parent, { input }, { db }) => {
    const newCategory = {
      id: uuid(),
      name: input.name
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (_parent, { input }, { db }) => {
    const newProduct = {
      id: uuid(),
      name: input.name,
      price: input.price,
      onSale: !!input.onSale,
      categoryId: input.categoryId
    };

    db.products.push(newProduct);

    return newProduct;
  },
  addReview: (_parent, { input }, { db }) => {
    const newReview = {
      id: uuid(),
      title: input.title,
      comment: input.comment,
      rating: input.rating,
      date: new Date().toISOString(),
      productId: input.productId
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (_parent, { id }, { db }) => {
    const categoryIndex = db.categories.findIndex((category) => category.id === id);

    if (categoryIndex === -1) {
      return false
    }

    db.categories.splice(categoryIndex, 1);
    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return { ...product, categoryId: null };
      }
      return product;
    });

    return true;
  },
  deleteProduct: (_parent, { id }, { db }) => {
    const productIndex = db.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return false
    }

    db.products.splice(productIndex, 1);
    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
  deleteReview: (_parent, { id }, { db }) => {
    const reviewIndex = db.reviews.findIndex((review) => review.id === id);

    if (reviewIndex === -1) {
      return false
    }

    db.reviews.splice(reviewIndex, 1);

    return true;
  },
  updateCategory: (_parent, { id, input }, { db }) => {
    console.log('INPUT', input);
    const categoryIndex = db.categories.findIndex((category) => category.id === id);

    if (categoryIndex < 0) {
      return null;
    }

    db.categories[categoryIndex] = {
      ...db.categories[categoryIndex],
      ...input
    };

    return db.categories[categoryIndex];
  },
  updateProduct: (_parent, { id, input }, { db }) => {
    const productIndex = db.products.findIndex((product) => product.id === id);

    if (productIndex < 0) {
      return null;
    }

    db.products[productIndex] = {
      ...db.products[productIndex],
      ...input
    };

    return db.products[productIndex];
  },
  updateReview: (_parent, { id, input }, { db }) => {
    const reviewIndex = db.reviews.findIndex((review) => review.id === id);

    if (reviewIndex < 0) {
      return null;
    }

    db.reviews[reviewIndex] = {
      ...db.reviews[reviewIndex],
      ...input
    };

    return db.reviews[reviewIndex];
  }
};