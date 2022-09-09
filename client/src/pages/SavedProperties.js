import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {GET_ME} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/react-hooks';
import { REMOVE_PROPERTY } from '../utils/mutations';
import Auth from '../utils/auth';
import { removePropertyId } from '../utils/localStorage';

const SavedProperties = () => {
  const {loading, data} = useQuery(GET_ME);
  const [removeProperty] = useMutation(REMOVE_Property);
  const userData = data?.me || [];

  // create function that accepts the propertie's mongo _id value as param and deletes the property from the database
  const handleDeletePropety = async (propertyId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await removeProoperty({
        variables: {propertyId}
      })

      //only triggers if the removeProperty mutation is successful
      removePropertyId(PropertyId);
    } catch (e) {
      console.log(e);
    }
  };

  // if data isn't here yet, say so
  if (loading) return <h2>LOADING RESULTS...</h2>

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved properties</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedProperties.length
            ? `Viewing ${userData.savedProperties.length} saved ${userData.savedProperties.length === 1 ? 'properties' : 'properties'}:`
            : 'You have no saved properties!'}
        </h2>
        <CardColumns>
          {userData.savedProperties.map((properties) => {
            return (
              <Card key={properties.propertyId} border='dark'>
                {property.image ? <Card.Img src={property.image} alt={`The cover for ${property.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{property.title}</Card.Title>
                  <p className='small'>Authors: {property.authors}</p>
                  <Card.Text>{property.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteProperty(property.propertyId)}>
                    Delete this Property!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default savedProperties;
