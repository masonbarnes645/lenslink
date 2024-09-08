import { useContext } from "react";
import UserContext from "./usercontext";
import toast from "react-hot-toast";

const NavBar = () =>{
  const { user,setUser } = useContext(UserContext);
  
  const handleLogOut = () =>{
        fetch("/api/v1/logout", {
            method: "DELETE",
            credentials: "include"
          }).then((res) => {
            if (res.ok) {
              setUser(null);
            }else {
              return res.json().then((errorObj) => {
                  toast.error(errorObj.error);
              });
          }
      })
      .catch((errorObj) => {
          toast.error(errorObj.error);
          console.log("21")
          });
    }


    return(
        <>
            {user ? (<h1>11</h1>) : (<h2>22</h2>)}
            <h1>test</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )
}

export default NavBar