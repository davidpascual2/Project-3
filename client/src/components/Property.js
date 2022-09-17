import { Button, Card } from 'react-bootstrap';
import { SAVE_PROPERTY } from '../utils/mutations';
import { useMutation }  from '@apollo/client';
import { savePropertyIds, getSavedPropertyIds } from '../utils/localStorage';
import './Property.css';


const Property = ({property:{ address, price, baths, beds, photo, rdc_web_url, sqft, lot_size, listing_id }}) =>
{
const [saveProp, { error, data }] = useMutation(SAVE_PROPERTY);
console.log(data, "DATA@@@@@@@")
 const handleFavSubmit = async (event, house, baths, beds, sqft, lot_size) => {
  // event.preventDefault();
  // console.log(event, "EVENT%%%%%%%", house)
  try{
  const { property  } = await saveProp({
    variables: { input:{address, price, baths, beds, photo, sqft, lot_size}},
  });
  // console.log(property, "PROPERTYYYYYYYYYY")
} catch (e) {
  console.error(e);
}
  }
  return (
   <div className="container">
    <Card key={listing_id} border='dark'>
    {photo ? (
      <Card.Img src={photo}  variant='top' />
    ) : null}
    <Card.Body>
      <Card.Title className="address">{address}</Card.Title>
      <p className='small'>Price: {price}</p>
      <p className='small'>Bathrooms: {baths}</p>
      <p className='small'>Bedrooms: {beds}</p>
      <p className='small'>sqft: {sqft}</p>
      <p className='small'>lot_size: {lot_size}</p>

      <Button
        //  disabled={data?.some((data) => data === listing_id)}
         className='btn-block btn-info'
         onClick={() => handleFavSubmit(listing_id, address)}>Save
         </Button>

         {/* <Button
            disabled={savedPropertyIds?.some((savedPropertyId) => savedBookId === book.bookId)}
            className='btn-block btn-info'
            onClick={() => handleSaveBook(book.bookId)}>
            {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
              ? 'This property has already been saved!'
              : 'Save this property!'}
          </Button> */}

         {/* <Button onClick={handleFavSubmit}>Save</Button> */}
         <Button href={rdc_web_url}>View More</Button>
    </Card.Body>
  </Card>
   </div>
    )};
    
    export default Property;
