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
      client_id: "149675200689-5hneg7c0ll7d3rti047vhhjpb3sl4ikh.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })
    google.accounts.id.renderButton(
      document.getElementById("Oauth-div"),
      { size: "large"}
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