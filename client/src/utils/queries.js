import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            savedProperties {
//TODO: add information coresponding to properties

                authors
                description
                title
                image
                link
                bookId
            }
        }
    }`