import "./SearchProperties.css";
import axios from 'axios';
import { useState } from "react";
import Property from "../components/Property";

function SearchProperties() {
  const [listings, setListings] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { state, city, bathrooms, bedrooms, minPrice, maxPrice } = e.target.elements;
  // console.log(e.target.elements)

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
  
  axios.request(options).then(function (response) {
    // console.log(response.data);
    setListings(response.data.listings)

  }).catch(function (error) {
    console.error(error);
  });
  };


  return (
    <>
    <div className="container">

      <form onSubmit={handleSubmit}>
        <h1>Search</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
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
              name="price(min)"
              placeholder="Price(min)"
              id="minPrice"
            />
            </div>
          <div className="field">
            <label>Price(max)</label>
            <input
              type="number"
              name="price(max)"
              placeholder="Price(max)"
              id="maxPrice"
              />
          </div>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
    <div className="container">
        <div className="container">
          {listings.map((property) => <Property property={property} key={property.id} />)}
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