import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
import { UserProvider } from "./usercontext";
function App() {


  return (
  <UserProvider>
    <div className="app">
      <header>
        <NavBar/>
      </header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  </UserProvider>
  );
}

export default App
