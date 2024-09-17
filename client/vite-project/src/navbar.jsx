import { useContext, useEffect } from "react";
import { UserContext } from './usercontext';
import { Menu } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function NavBar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate()


  const handleLogout = () => {
    fetch("/api/v1/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setUser(null);
        navigate('/');
        toast("Log Out Successful!", {
          icon: '👋',
        });
      } else {
        res.json().then((errorObj) => {
          toast.error(errorObj.error);
        });
      }
    }).catch((error) => {
      toast.error("An error occurred while logging out.");
    });
  };


  return (
    <>
      <div className="ui top fixed menu">
        <Menu fixed="top" inverted>
          <Menu.Item as={Link} to="/" header>
            {" "}
            Home{" "}
          </Menu.Item>
          <Menu.Item as={Link} to="/photographers" header>
            {" "}
            Photographers{" "}
          </Menu.Item>
  
          {user ? (
            <>
              <Menu.Item as={Link} to="/myprofile" header>
                {" "}
                My Profile{" "}
              </Menu.Item>
              <Menu.Item as={Link} to="/login" onClick={handleLogout}>
                {" "}
                Log Out{" "}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item as={Link} to="/login" header>
                {" "}
                Log In
              </Menu.Item>
              <Menu.Item as={Link} to="/signup" header>
                {" "}
                Sign Up{" "}
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </>
  );
}

export default NavBar

