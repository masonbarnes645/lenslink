import { Outlet } from "react-router-dom";
import NavBar from "./navbar";
function App() {


  return (
    <div className="app">

      <header>
        <NavBar/>
      </header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App
