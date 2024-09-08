import { useContext } from "react";
import UserContext from "./usercontext";

const NavBar = () =>{
  const { user,setUser } = useContext(UserContext);
    const handleLogOut = () =>{
        fetch("http://localhost:5555/api/v1/logout", {
            method: "DELETE",
          }).then((res) => {
            if (res.status == 204) {
              updateUser(null);
            }
          });
    }


    return(
        <>
            <h1>test</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )
}

export default NavBar