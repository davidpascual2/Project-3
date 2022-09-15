import { Button, Card } from 'react-bootstrap';
import { SAVE_PROPERTY } from '../utils/mutations';
import { useMutation }  from '@apollo/client';


const Property = ({property:{ address, price, baths, beds, photo, rdc_web_url, sqft, lot_size, listing_id }}) =>
{
const [saveProp, { error, data }] = useMutation(SAVE_PROPERTY);

 const handleFavSubmit = async (event) => {
  event.preventDefault();

  try{
  const { property  } = await saveProp({
    variables: { input:{address, price, baths, beds, photo, sqft, lot_size}},
  });
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
      <Card.Title>{address}</Card.Title>
      <p className='small'>Price: {price}</p>
      <p className='small'>Bathrooms: {baths}</p>
      <p className='small'>Bedrooms: {beds}</p>
      <p className='small'>sqft: {sqft}</p>
      <p className='small'>lot_size: {lot_size}</p>

      {/* <Button
         disabled={savedPropertyIds?.some((savedPropertyId) => savedPropertyId === property.propertyId)}
         className='btn-block btn-info'
         onClick={() => handleSaveProperty(property.propertyId)}>
         {savedPropertyIds?.some((savedPropertyId) => savedPropertyId === property.propertyId)
            ? 'This property has already been saved!'
            : 'Save this Property!'}
         </Button> */}
         <Button onClick={handleFavSubmit}>Save</Button>
         <Button href={rdc_web_url}>View More</Button>
    </Card.Body>
  </Card>
   </div>
    )};
    
    export default Property;
