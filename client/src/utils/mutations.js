import {gql} from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}`;

export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
        }
    }
}`;

export const SAVE_PROPERTY = gql`
mutation SaveProperty($input: property!) {
  saveProperty(input: $input) {
    _id
    username
    propertyCount
    savedProperties {
               address
            price
            baths
            beds
            photo
            rdc_web_url
            sqft
            lot_size
            listing_id
    }
  }
}`;
export const REMOVE_PROPERTY = gql`
mutation removeProperty($propertyId: ID!) {
    removeProperty(propertyId: $propertyId) {
        _id
        username
        propertyCount
        savedProperties {
            address
            price
            baths
            beds
            photo
            rdc_web_url
            sqft
            lot_size
            listing_id
        }
    }
}`