import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import NavBar from "../src/components/Navbar";
import PokemonListPage from './page/PokemonListPage';
import TypeListPage from './page/TypeListPage';
import PokemonDropdown from './page/PokemonDropdown';
import PokemonCreationPage from './page/PokemonCreationPage';
import TypeCreationPage from './page/TypeCreationPage';

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <NavBar />
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route path="/types" element={<TypeListPage />} />
            <Route path="/dropdown" element={<PokemonDropdown />} />
            <Route path="/create" element={<PokemonCreationPage />} />
            <Route path="/createType" element ={<TypeCreationPage/>}/>
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}
