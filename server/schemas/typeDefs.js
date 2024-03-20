const typeDefs = `
type Item {
    _id: ID
    name: String
    quantity: String
  }
  
  type List {
    _id: ID
    title: String
    addedDate: Date
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

  type LogoutResponse {
    message: String
  }

  scalar Date

  type MyType {
    id: ID!
    name: String
    createdAt: Date
    updatedAt: Date
  }
  
  type Query {
    item(_id: ID!): Item
    user: User
    list(_id: ID!): List
    myType(id: ID!): MyType
  }
  
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    createList(title: String!): List
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    addItemToList(listId: ID!, name: String!, quantity: String): Item
    login(email: String!, password: String!): Auth
    logout: LogoutResponse
  }
  
  `

  module.exports = typeDefs;