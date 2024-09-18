import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext';
import NavBar from './navbar';
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";

const App = () => {

  


  return (
    <UserProvider>
      <div className="app">
        <Toaster
          position='top-left'
        />
        <header>
          <NavBar />
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;