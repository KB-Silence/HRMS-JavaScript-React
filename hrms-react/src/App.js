import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React, { useState } from 'react';
import Navi from './layouts/Navi';
import Footer from './layouts/Footer';
import Dashboard from './layouts/Dashboard';
import { useHistory } from 'react-router-dom';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userType, setUserType] = useState("")
  const history = useHistory()
  
  function handleUserType(name) {
    setUserType(name)
  }

  function handleSignOut() {
    setIsAuthenticated(false)
    history.push("/")
  }

  function handleSignIn() {
    setIsAuthenticated(true)
    history.push("/")
  }

  return (
    <div className="App">
      <Navi isAuthenticated={isAuthenticated} userType={userType} signOut={handleSignOut} />
      <Dashboard isAuthenticated={handleSignIn} userType={handleUserType} />
      <Footer />
    </div>
  );
}
export default App;
