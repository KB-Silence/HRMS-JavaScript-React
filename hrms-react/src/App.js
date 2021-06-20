import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React, { useState } from 'react';
import Navi from './layouts/Navi';
import Footer from './layouts/Footer';
import Dashboard from './layouts/Dashboard';


function App() {
  const [activeItem, setActiveItem] = useState('home')

  function handleItemClick(e, { name }) {
    setActiveItem(name)
  }


  return (
    <div className="App">
      <Navi activeItem={activeItem} setActiveItem={handleItemClick} />
      <Dashboard />
      <Footer />
    </div>
  );
}
export default App;
