import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
// import { searchGoogleBooks } from '../utils/API'; //replace with property/mortgage api
import { savePropertyIds, getSavedPropertyIds } from '../utils/localStorage';
import {useMutation} from '@apollo/react-hooks';
import { SAVE_PROPERTY } from '../utils/mutations';

const SearchProperties = () => {
  // create state for holding returned google api data
  const [searchedProperties, setSearchedProperties] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved propertyId values
  const [savedPropertyIds, setSavedPropertyIds] = useState(getSavedPropertyIds());
  const [saveProperty] = useMutation(SAVE_PROPERTY);

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savePropertyIds(savedPropertyIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) return false;

    try {
        //const response = await searchGoogleBooks(searchInput); replace with property search api

      if (!response.ok) throw new Error('something went wrong!');
      
      const { items } = await response.json();

      //TODO* refactor this data to match input from Properties data api
    //   const bookData = items.map((book) => ({
    //     bookId: book.id,
    //     authors: book.volumeInfo.authors || ['No author to display'],
    //     title: book.volumeInfo.title,
    //     description: book.volumeInfo.description,
    //     image: book.volumeInfo.imageLinks?.thumbnail || '',
    //   }));

      setSearchedProperties(propertyData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a property to our database
  const handleSaveProperty = async (propertyId) => {
    // find the propert in `searchedBooks` state by the matching id
    const propertyToSave = searchedProperties.find((property) => property.propertyId === propertyId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await saveProperty({
        variables: {input: propertyToSave}
      })
      
      setSavedPropertyIds([...savedPropertyIds, propertyToSave.propertyId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Properties!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a property'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedProperties.length
            ? `Viewing ${searchedProperties.length} results:`
            : 'Search for a property to begin'}
        </h2>
        //TODO: refactor card column with correct property information
        <CardColumns>
          {searchedProperties.map((property) => {
            return (
              <Card key={property.propertyId} border='dark'>
                {property.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{property.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedPropertyIds?.some((savedPropertyId) => savedPropertyId === property.propertyId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveProperty(property.propertyId)}>
                      {savedPropertyIds?.some((savedPropertyId) => savedPropertyId === property.propertyId)
                        ? 'This property has already been saved!'
                        : 'Save this Property!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchProperties;