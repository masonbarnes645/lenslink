import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './usercontext'; 
import NavBar from './navbar'; 

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
    </UserProvider>
  );
}

export default App;