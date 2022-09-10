const { gql } = require('apollo-server-express');

//SEE INPUT PROPERTY QUERY
const typeDefs = gql`
type Property {
    propertyId: String 
    address: [String]
    price: String
    baths: Int
    beds: Int
    photo: String
    link: String
    sqft: String
    lot_size: String
}
type User {
    _id: ID!
    username: String
    propertyCount: Int
    savedProperties: [Property]
}
Input property {
    propertyId: String 
    address: [String]
    price: String
    baths: Int
    beds: Int
    photo: String
    link: String
    sqft: String
    lot_size: String
}
type Auth {
    token:ID!
    user: User
}
type Query {
    me: User
}
type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    saveProperty(input: property!): User
    removeProperty(propertyId: ID!): User
}
`;

module.exports = typeDefs;

//line 5 - should this be id or propertyId?
//line 6 - what is  [string] in an array 