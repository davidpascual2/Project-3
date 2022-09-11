import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
    const [propertyName, setPropertyName] = useState('');
    const [title, setTitle] = useState('');
    const [types, setTypes] = useState('Rent');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [homes, setHomes] = useState([]);
    const [filterData, setFilterData] = useState([]);


    const handleSaveHome = async (e) => {
        e.preventDefault();

        const requestBody = {
            query: `
                mutation CreateEvent($title: String!, $desc: String!, $price: String!, $image: String!, $types: String!, $propertyName: String!) {
                  createEvent(eventInput: {title: $title, description: $desc, price: $price, image: $image, types: $types, propertyName: $propertyName}) {
                    title
                    description
                    price
                    image
                    types
                    propertyName
                  }
                }
              `,
            variables: {
                title: title,
                desc: description,
                price: price,
                image,
                types,
                propertyName,
            }
        };

        try {
            const res = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            });

            const result = await res.json();
            setHomes((preval) => {
                return [...preval, result.data.createEvent]
            })

            setPropertyName('');
            setTitle('');
            setPrice('');
            setImage('');
            setDescription('');

        } catch (error) {
            console.log(error)
        }
    };

    const fetchHomes = async () => {
        const requestBody = {
            query: `
                query {
                  events {
                    title
                    description
                    price
                    image
                    types
                    propertyName
                  }
                }
              `
        };

        try {
            const res = await fetch('http://localhost:8000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await res.json();
            setHomes(result.data.events)
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(() => {
        fetchHomes();
    }, [])



    const filterHomes = (val) => {
        const filter = homes.filter((item) => item.types === val);
        setFilterData(filter);
    };

    useEffect(() => {
        setFilterData(homes);
    }, [homes])


    const handleSearch = (e) => {
        const searchData = homes.filter((item) =>
            item.propertyName.toLowerCase().includes(e?.target?.value.toLowerCase()));
        setFilterData(searchData);
    };


    if (!localStorage.getItem('token')) {
        return <Navigate to='/' />
    };
    return (
        <div className='jkhkjhkjh'>
            <div className='header bg-dark text-white pt-3 pb-2'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-1'>
                            <div className='logo'>
                                <h5>HomeGuru</h5>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <ul className='d-flex'>
                                <li><a href="#">Buy</a></li>
                                <li><a href="#">Rent</a></li>
                            </ul>
                        </div>

                        <div className='col-md-5'>
                            <ul className='d-flex justify-content-end'>
                                <li data-bs-toggle="modal" data-bs-target="#exampleModal"><a href="#">Saved home</a></li>
                                <li><a href="#">Saved searches</a></li>
                                <li onClick={() => {
                                    localStorage.clear();
                                    navigate('/');
                                }}><a href="#">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='text-white text-center pt-5'>
                    <h3>The light is what guides you home, the warmth is <br /> what keeps you there.</h3>
                </div>

                <div className='text-center pt-5'>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => filterHomes('Sell')} type="button" className="btn btn-secondary">Buy</button>
                        <button onClick={() => filterHomes('Rent')} type="button" className="btn btn-secondary">Rent</button>
                    </div>
                </div>

                <div className='row justify-content-center pt-5'>
                    <div className='col-md-5'>
                        <div className="input-group input-group-lg">
                            <input onChange={handleSearch} placeholder='Search by neighborhood!' type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                        </div>
                    </div>
                </div>

                <div className='row g-4 py-5'>
                    {
                        filterData?.map((item) => (
                            <div key={item.id} className='col-md-3'>
                                <div className="card shadow">
                                    <img height={160} src={item.image} className="card-img-top" alt="..." />
                                    <div className="card-body" style={{ height: '230px' }}>
                                        <h5 className="card-title">{item.propertyName}</h5>
                                        <small>{item.title}</small>
                                        <br />
                                        <small>Type: {item.types}</small>
                                        <p className="card-text text-muted">{item.description}</p>
                                        <h5 className="card-title text-primary">${item.price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Save Home</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSaveHome} className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input maxLength={20} type="text" required className="form-control" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Title</label>
                                        <input maxLength={30} type="text" required className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="inputState" className="form-label">Type</label>
                                        <select required onChange={(e) => setTypes(e.target.value)} id="inputState" className="form-select">
                                            <option value={'Rent'}>Rent</option>
                                            <option value={'Sell'}>Sell</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Price</label>
                                        <input type="number" required className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                                    </div>

                                    <div className="col-md-12">
                                        <label className="form-label">Description</label>
                                        <textarea maxLength={100} required className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Type here"></textarea>
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label">Image url</label>
                                        <input type="text" required className="form-control" value={image} onChange={(e) => setImage(e.target.value)} />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
};

export default Dashboard;
