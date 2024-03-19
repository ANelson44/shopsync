const typeDefs = `
type Item {
    _id: ID
    name: String
    quantity: String
  }
  
  type List {
    _id: ID
    title: String
    createdDate: Date
    items: [Item]
  }
  
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    lists: [List]
  }
  
  type Auth {
    token: ID
    user: User
  }
  
  type Query {
    item(_id: ID!): Item
    user: User
    list(_id: ID!): List
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    createList(title: String!, items: [ID]!): List
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addItemToList(listId: ID!, name: String!, quantity: String): Item
    login(email: String!, password: String!): Auth
    logout: String
  }
  
  `

  module.exports = typeDefs;