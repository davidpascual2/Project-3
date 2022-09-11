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
mutation saveProperty($input: property!) {
    saveProperty(input: $input) {
        _id
        username
        //TODO: refactor mutation to use property information
        // bookCount
        // savedBooks {
        //     bookId
        //     authors
        //     description
        //     image
        //     link
        //     title
        }
    }
}`;

export const REMOVE_PROPERTY = gql`
mutation removeProperty($propertyId: ID!) {
    removeProperty(propertyId: $propertyId) {

        //TODO: refactor mutation to use property information
        _id
        username
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}`