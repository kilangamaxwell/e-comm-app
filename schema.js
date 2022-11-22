// Define type definition for the query or mutation
/**
 * Types of return types: Scalar and Obect types
 * Scalar: string, int, boolean, float
 */
const { gql } = require("apollo-server");
const { products, categories } = require("./db");

exports.typeDefs = gql`
  type Query {
    product(id: ID!): Product
    products(filter: ProductFilterInput): [Product!]!
    categories: [Category!]!
    category(id: ID!): Category
    review(id: ID!): Review
    reviews: [Review!]!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    products(filter: ProductFilterInput!): [Product!]!
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category!
    addProduct(input: AddProductInput!): Product!
    addReview(input: AddReviewInput!): Review!

    deleteCategory(id: ID!): Boolean!
  }

  input AddCategoryInput {
    name: String
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    categoryId: String
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productName: String!
  }

  input ProductFilterInput {
    onSale: Boolean
    avgRating: Int
    priceLimit: Float
  }
`;
