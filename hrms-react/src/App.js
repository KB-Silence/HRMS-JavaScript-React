import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React, { useState } from 'react';
import Navi from './layouts/Navi';
import HomeDashboard from './layouts/HomeDashboard'


function App() {
  const [activeItem, setActiveItem] = useState('home')

  function handleItemClick(e, { name }) {
    setActiveItem(name)
  }

  return (
    <div className="App">
      <Navi activeItem={activeItem} setActiveItem={handleItemClick} />
      <HomeDashboard setActiveItem={handleItemClick} />
    </div>
  );
}
export default App;
