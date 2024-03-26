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
    createdBy: User
    collaborators: [User]
  }
  
  type User {
    _id: ID
    userName: String
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
    lists:[List]
    myType(id: ID!): MyType
  }
  
  type Mutation {
    addUser(userName: String!, email: String!, password: String!): Auth
    addCollaboratorToList(listId: ID!, email: String!): List
    createList(title: String!): List
    updateUser(userName: String, email: String, password: String): User
    addItemToList(listId: ID!, name: String!, quantity: String): Item
    updateItemInList(listId: ID!, itemId: ID!, updatedItem: UpdateItemInput!): List
    login(email: String!, password: String!): Auth
    logout: LogoutResponse
    deleteItemFromList(listId: ID!, itemId: ID!): List
    deleteList(listId: ID!): String
    leaveList(listId: ID!): List
  }

  input UpdateItemInput {
    name: String
    quantity: String
  }
  
  
  `

  module.exports = typeDefs;