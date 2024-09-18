import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext'; 
import NavBar from './navbar'; 
import { useEffect } from 'react';

const App = () => {

  const google = window.google;

  const handleCallbackResponse = async (res) => {
    const token = res.credential;
    debugger
    try {
      const response = await fetch('/api/v1/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: token }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Backend response:', data);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id:
          "627934005778-fesgjrq4lib59o7o52gnkamg1uh9fbj8.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
    }
    else {
      setTimeout(initializeGoogleSignIn, 100)
    }
  }

  useEffect(() => {
    /* global google */

    const loadGoogleScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/platform.js";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };


    loadGoogleScript().then(() => {
      initializeGoogleSignIn();
    })
    .then(() => {
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: 'outline', size: 'large'}
      )
  
    });
  }, []);



  return (
    <UserProvider>
      <div className="app">
        <header>
          <NavBar />
          <div id='signInDiv'></div>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;