import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext'; 
import NavBar from './navbar';
import { Toaster } from 'react-hot-toast';

const App = () => {

  

  return (
    <UserProvider>
      <div className="app">
        <header>
          <NavBar />
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </UserProvider>
  );
};

export default App;
