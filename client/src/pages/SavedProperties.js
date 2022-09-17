import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {GET_ME} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/client';
import { REMOVE_PROPERTY, SAVE_PROPERTY } from '../utils/mutations';
import Auth from '../utils/auth';
// import { Property } from '../components/Property'
import { getSavedPropertyIds, removePropertyId } from '../utils/localStorage';

const SavedProperties = () => {
  const {loading, data} = useQuery(GET_ME);
  const [removeProperty] = useMutation(REMOVE_PROPERTY); 
// console.log(data.me.savedProperties)
  const userData = {};
  // return(
  // [address:
  // price:
  // photo:
  // ]
  
  
  const handleDeleteProperty = async (event, house, baths, beds, sqft, lot_size) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await removeProperty({
        // variables: {propertyId}
        variables: {event, house, baths, beds, sqft, lot_size}
      })

      //only triggers if the removeProperty mutation is successful
      removePropertyId(event, house, baths, beds, sqft, lot_size);
    } catch (e) {
      console.log(e);
    }
  };

  // if data isn't here yet, say so
  if (loading) return <h2>LOADING RESULTS...</h2>

  
// };
  return (
    <>
      <div fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved properties</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {data.me.savedProperties.length > 0
            ? `Viewing ${data.me.savedProperties.length} saved ${data.me.savedProperties.length === 1 ? 'property' : 'properties'}:`
            : 'You have no saved properties!'}
        </h2>
        <div>
          {data.me.savedProperties.map((property) => {
            console.log(property, "PROPERTY!!!!!!!!!!")
            return (
              <div className="container">
                  <Card 
                    // key={propertyId} 
                    border='dark'
                    >
                   
                  <Card.Body> 
                    {/* <Card.Title>{address}</Card.Title> */}
                    <p className='small'>Price: {property.price}</p>
                    <p className='small'> Address: {property.address}</p>
                    <img className='small' alt='picture of property' src= {property.photo}/>
                  
                    {/* <img >{property.photo}</img> */}
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteProperty(listing_id, address)}>
                  
                    Delete this Property!
                  </Button>
                </Card.Body>
              </Card>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SavedProperties;

