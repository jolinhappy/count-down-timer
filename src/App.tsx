import React from 'react';
import Layout from './layouts/Layout';
import Navbar from './components/Navbar';
import Main from './components/main/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Layout navbar={ <Navbar/> } main={ <Main /> } />
    </div>
  );
}

export default App;
