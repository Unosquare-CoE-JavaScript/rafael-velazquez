const { gql } = require('apollo-server');

exports.typeDefs = gql`
  type Query {
    hello: String
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory(input: AddCategoryInput): Category
    addProduct(input: AddProductInput): Product
    addReview(input: AddReviewInput): Review
    deleteCategory(id: ID!): Boolean!
    deleteProduct(id: ID!): Boolean!
    deleteReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput): Category
    updateProduct(id: ID!, input: UpdateProductInput): Product
    updateReview(id: ID!, input: UpdateReviewInput): Review
  }

  type Product {
    id: ID!
    price: Float
    name: String
    quantity: Int
    onSale: Boolean
    avgRating: Int
    description: String
    image: String
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product!]!
  }

  type Review {
    id: ID!
    title: String!
    comment: String!
    rating: Int!
    date: String!
  }

  input ProductsFilterInput {
    onSale: Boolean,
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    price: Float!
    onSale: Boolean
    categoryId: ID!
  }

  input UpdateProductInput {
    name: String
    price: Float
    quantity: Int
    onSale: Boolean
    description: String
    image: String
    categoryId: ID
    avgRating: Int
  }

  input AddReviewInput {
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  input UpdateReviewInput {
    title: String
    comment: String
    rating: Int
  }
`;