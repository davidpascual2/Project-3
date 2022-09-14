const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Property {
    address: String
    price: String
    baths: String
    beds: Int
    photo: String
    rdc_web_url: String
    sqft: String
    lot_size: String
    listing_id: String
}
type User {
    _id: ID!
    username: String
    email: String
    propertyCount: Int
    savedProperties: [Property]
}
input property {
    propertyId: String 
    address: String
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
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveProperty(input: property!): User
    removeProperty(propertyId: ID!): User
}
`;

module.exports = typeDefs;

//line 5 - should this be id or propertyId?
//line 6 - what is  [string] in an array 