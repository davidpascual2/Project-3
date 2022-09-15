import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
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