import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext'; 
import NavBar from './navbar'; 
import { useEffect } from 'react';

const App = () => {

  const google = window.google;

  const handleCallbackResponse = (res) =>{
    console.log(res.credential)
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: 
        "149675200689-v4e6n63l8uf098kemu3mss77kgi6qhp4.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("Oauth-div"),
      { theme:"outline", size: "large"}
    )
    
  },[])


  return (
    <UserProvider>
      <div className="app">
        <header>
          <NavBar />
          <div id='Oauth-div'></div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;