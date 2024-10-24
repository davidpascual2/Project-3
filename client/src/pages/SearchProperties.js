import "./SearchProperties.css";
import axios from 'axios';
import { useState } from "react";
import Property from "../components/Property";

function SearchProperties() {
  const [listings, setListings] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { state, city, bathrooms, bedrooms, minPrice, maxPrice } = e.target.elements;
  // // console.log(e.target.elements)

  //   const options = {
  //     method: 'GET',
  //     url: 'https://realty-in-us.p.rapidapi.com/properties/list-for-sale',
  //     params: {
  //     state_code: state.value,
  //     city: city.value,
  //     offset: '0',
  //     limit: '20',
  //     sort: 'relevance',
  //     baths_min: bathrooms.value,
  //     beds_min: bedrooms.value,
  //     price_min: minPrice.value,
  //     price_max: maxPrice.value
  //   },
  //   headers: {
  //     'X-RapidAPI-Key': 'a5cc60833fmsh8bc4e368d7b4ea0p199293jsn2e49c05cbeef',
  //     'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
  //   }
  // };
  
  // axios.request(options).then(function (response) {
  //   // console.log(response.data);
  //   setListings(response.data.listings)

  // }).catch(function (error) {
  //   console.error(error);
  // });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    const { state, city, bathrooms, bedrooms, minPrice, maxPrice } = e.target.elements;
  
    const options = {
      method: 'GET',
      url: 'https://realty-in-us.p.rapidapi.com/properties/list-for-sale',
      params: {
        state_code: state.value,
        city: city.value,
        offset: '0',
        limit: '20',
        sort: 'relevance',
        baths_min: bathrooms.value,
        beds_min: bedrooms.value,
        price_min: minPrice.value,
        price_max: maxPrice.value
      },
      headers: {
        'X-RapidAPI-Key': 'a5cc60833fmsh8bc4e368d7b4ea0p199293jsn2e49c05cbeef',
        'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
      }
    };
  
    // axios.request(options).then((response) => {
    //   console.log('Response:', response.data);
    //   setListings(response.data.listings);
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });

    //trouble shoot
    // axios.request(options).then((response) => {
    //   console.log('Full Response:', response);
    //   if (response.data && response.data.listings) {
    //     console.log('Listings:', response.data.listings);
    //     setListings(response.data.listings);
    //   } else {
    //     console.log('No listings found.');
    //   }
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });
    axios.request(options)
    .then((response) => {
      console.log('Full Response:', response);
      if (response.data && response.data.listings) {
        console.log('Listings:', response.data.listings);
        setListings(response.data.listings);
      } else {
        console.log('No listings found.');
      }
    })
    .catch((error) => {
      // Check if there is an error response from the server
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No Response from API:', error.request);
      } else {
        // Other errors during request setup
        console.error('Error during API Request Setup:', error.message);
      }
      console.error('Error Config:', error.config);
    });

    
  };
  


  return (
    <>
    <div className="searchPropContainer container">

      <form onSubmit={handleSubmit} className="searchForm d-flex flex-column rounded">
        <h1>Search</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="WA"
              id="state"
            />
          </div>
          <div className="field">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              id="city"
            />
          </div>
          <div className="field">
            <label>Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              placeholder="Bathrooms"
              id="bathrooms"
            />
            </div>
            <div className="field">
            <label>Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              placeholder="Bedrooms"
              id="bedrooms"
            />
            </div>
          <div className="field">
            <label>Price(min)</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Price(min)"
              id="minPrice"
            />
            </div>
          <div className="field">
            <label>Price(max)</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="Price(max)"
              id="maxPrice"
              />
          </div>
          <button type="submit" className="searchButton">Submit</button>
        </div>
      </form>
    </div>

    {/* Conditionally render results */}
    {/* <div className="resultsContainer container-fluid">
      <div className="container">
        {listings && listings.length > 0 ? (
          listings.map((property) => (
            <Property property={property} key={property.id} />
          ))
        ) : (
          <p>No results found. Try a different search.</p>
        )}
      </div>
    </div> */}
    
    {/* <div className="container">
        <div className="container">
          {listings.map((property) => <Property property={property} key={property.id} />)}
        </div>
    </div> */}

    <div className="resultsContainer container-fluid">
      <div className="container">
        {listings && listings.map((property) => (
        <Property property={property} key={property.id} />
      ))}
      </div>
    </div>

    </>
  )
}

export default SearchProperties;
// return (
//   <div><button onClick={getListings}>listings</button> Address:
//   {listings.map((property) => <Property property={property} key={property.id} />)}
//   </div>
// );