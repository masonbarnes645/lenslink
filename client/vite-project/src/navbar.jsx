import { useContext, useEffect } from "react";
import { UserContext } from './usercontext';

import toast from "react-hot-toast";
import Login from "./login";


function NavBar() {
  const { user, setUser } = useContext(UserContext);


  const handleLogOut = () => {
    fetch("http://localhost:5555/api/v1/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status == 204) {
        setUser(null);
      }
    });
  };


  return (
    <>
      {user ? (<h1>11</h1>) : (<h2>22</h2>)}
      <h1>test</h1>
      <button onClick={handleLogOut}>Log Out</button>
      <Login />
    </>
  )
}

export default NavBar