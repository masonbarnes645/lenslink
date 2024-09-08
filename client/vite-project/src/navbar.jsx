

const NavBar = () =>{
    
    const handleLogOut = () =>{
        fetch("/logout", {
            method: "DELETE",
          }).then((res) => {
            if (res.status == 204) {
              updateUser(null);
            }
          });
    }


    return(
        <>
            <h1>SUCK MY DICK</h1>
            <button onClick={handleLogOut}>Log Out</button>
        </>
    )
}

export default NavBar