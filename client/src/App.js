import React from 'react';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchProperties from './pages/SearchProperties';
import SavedProperties from './pages/SavedProperties';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
        <Navbar className='navbarr '/>
        <Routes>
          <Route exact path="/" element={<SearchProperties/>}/> 
          <Route exact path="/saved" element={<SavedProperties/>}/>
          <Route render={() => <h1 className="display-2">Wrong page!</h1>}></Route> 
        </Routes>
          </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
