import { Outlet } from "react-router-dom";

function App() {


  return (
    <div className="app">

      <header>
        {/* <NavBar/> */}
      </header>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App
