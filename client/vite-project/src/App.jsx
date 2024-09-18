import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext'; 
import NavBar from './navbar'; 

const App = () => {

  const handleCallbackResponse = async (res) => {
    const token = res.credential;
    
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

      // Handle successful authentication here, e.g., update user context

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.initialize({
        client_id: "627934005778-fesgjrq4lib59o7o52gnkamg1uh9fbj8.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: 'outline', size: 'large' }
      );
    } else {
      // Retry initialization if Google script is not ready yet
      setTimeout(initializeGoogleSignIn, 100);
    }
  };

  useEffect(() => {
    const loadGoogleScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client"; // Updated script URL
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        document.head.appendChild(script);
      });
    };

    loadGoogleScript().then(() => {
      initializeGoogleSignIn();
    }).catch(error => {
      console.error('Failed to load Google script:', error);
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
};

export default App;
