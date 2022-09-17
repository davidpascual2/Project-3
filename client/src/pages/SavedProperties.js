import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import {GET_ME} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/client';
import { REMOVE_PROPERTY, SAVE_PROPERTY } from '../utils/mutations';
import Auth from '../utils/auth';
// import { Property } from '../components/Property'
import { getSavedPropertyIds, removePropertyId } from '../utils/localStorage';

// const SavedProperties = () => {
//   const {loading, data} = useQuery(GET_ME);
//   const [removeProperty] = useMutation(REMOVE_PROPERTY); 
//   // const userData = data?.me || [];
//   // <p className='small'>Price: {price}</p>
//   // <p className='small'>Bathrooms: {baths}</p>
//   // <p className='small'>Bedrooms: {beds}</p>
//   // <p className='small'>sqft: {sqft}</p>
//   // <p className='small'>lot_size: {lot_size}</p>
//   const userData = {};
//   userData["savedProperties"] = [
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     },
//     {
//       price: 123,
//       baths: 12,
//       sqft: 3448,
//       lot_size: 34849
//     }
//   ]
//   //???????????
//   // const [savedPropertyIds, setSavedPropertyIds] = useState(getSavedPropertyIds());
//   // const [ saveProperty] = useMutation(SAVE_PROPERTY)
  
//   // console.log(userData, "SSSSSSSSSS")
//   // create function that accepts the propertie's mongo _id value as param and deletes the property from the database
//   const handleDeleteProperty = async (propertyId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) return false;

//     try {
//       await removeProperty({
//         // variables: {propertyId}
//         variables: {propertyId}
//       })

//       //only triggers if the removeProperty mutation is successful
//       removePropertyId(propertyId);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   // if data isn't here yet, say so
//   if (loading) return <h2>LOADING RESULTS...</h2>

//   // return (
//   //   <>
//   //     <div fluid className='text-light bg-dark'>
//   //       <Container>
//   //         <h1>Viewing saved properties</h1>
//   //       </Container>
//   //     </div>
//   //     <Container>
//   //       <h2>
//   //         {userData.savedProperties.length
//   //           ? `Viewing ${userData.savedProperties.length} saved ${userData.savedProperties.length === 1 ? 'properties' : 'properties'}:`
//   //           : 'You have no saved properties!'}
//   //       </h2>
//   //       <div>
//   //         {userData.savedProperties.map((property) => {
//   //           return (
              
//   //             <Card key={property.propertyId} border='dark'>
//   //               {property.image ? <Card.Img src={property.image} alt={`The cover for ${property.title}`} variant='top' /> : null}
//   //               <Card.Body>
//   //                 <Card.Title>{property.title}</Card.Title>
//   //                 <p className='small'>Authors: {property.authors}</p>
//   //                 <Card.Text>{property.description}</Card.Text>
//   //                 <Button className='btn-block btn-danger' onClick={() => handleDeleteProperty(property.propertyId)}>
//   //                   Delete this Property!
//   //                 </Button>
//   //               </Card.Body>
//   //             </Card>
//   //           );
//   //         })}
//   //       </div>
//   //     </Container>
//   //   </>
//   // );

// // };
//   return (
//     <>
//       <div fluid className='text-light bg-dark'>
//         <Container>
//           <h1>Viewing saved properties</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2>
//           {userData.savedProperties.length > 0
//             ? `Viewing ${userData.savedProperties.length} saved ${userData.savedProperties.length === 1 ? 'property' : 'properties'}:`
//             : 'You have no saved properties!'}
//         </h2>
//         <div>
//           {userData.savedProperties.map((property) => {
//             console.log(property, "PROPERTY!!!!!!!!!!")
//             return (
//               <div className="container">
//                   <Card 
//                     // key={propertyId} 
//                     border='dark'
//                     >
//                   {/* {photo ? (
//                     <Card.Img src={photo}  variant='top' />
//                   ) : null} */}
//                   <Card.Body>
//                     {/* <Card.Title>{address}</Card.Title> */}
//                     <p className='small'>Price: {property.price}</p>
//                     <p className='small'>Bathrooms: {property.baths}</p>
//                     <p className='small'>Bedrooms: {property.beds}</p>
//                     <p className='small'>sqft: {property.sqft}</p>
//                     <p className='small'>lot_size: {property.lot_size}</p>
//                   <Button className='btn-block btn-danger' onClick={() => 
//                     // handleDeleteProperty(propertyId)
//                     console.log("clicked")
//                   }>
//                     Delete this Property!
//                   </Button>
//                 </Card.Body>
//               </Card>
//               </div>
//             );
//           })}
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SavedProperties;

//===============================================================================================//

const SavedProperties = () => {
  const {loading, data} = useQuery(GET_ME);
  const [removeProperty] = useMutation(REMOVE_PROPERTY);
  const userData = data?.me || [];

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteProperty = async (propertyId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) return false;

    try {
      await removeProperty({
        variables: {propertyId}
      })

      //only triggers if the removeBook mutation is successful
      removePropertyId(propertyId);
    } catch (e) {
      console.log(e);
    }
  };

  // if data isn't here yet, say so
  if (loading) return <h2>LOADING RESULTS...</h2>

  return (
    <>
      <div fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved properties!</h1>
        </Container>
      </div>
      <Container>
        <h2>
          {userData.savedProperties.length
            ? `Viewing ${userData.savedProperties.length} saved ${userData.savedProperties.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <div>
          {userData.savedProperties.map((property) => {
            return (
              <Card key={property.listing_id} border='dark'>
                {/* {property.photo ? <Card.Img src={property.photo} alt={`The cover for ${book.title}`} variant='top' /> : null} */}
                <Card.Body>
                  {/* <Card.Title>{property.address}</Card.Title> */}
                  <p className='small'>Price: {property.price}</p>
                  <p className='small'>baths: {property.baths}</p>
                  <p className='small'>beds: {property.beds}</p>
                  <p className='small'>sqft: {property.sqft}</p>
                  <p className='small'>lot size: {property.lot_size}</p>
                  {/* <Card.Text>{book.description}</Card.Text> */}
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteProperty(property.listing_id)}>
                    Delete this property!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SavedProperties;
