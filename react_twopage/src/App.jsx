import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";

function App() {
  const pages = ["Home", "Settings"];
  const [activepage, changePage] = useState(pages[0]);

  return (
    <>
      <div
        className='container-flud p-0'
        style={{ height: "calc(100vh - 60px)" }}
      >
        {/* stage */}
        {activepage == "Home" && <HomePage />}
      </div>

      <NavBar
        activelink={activepage}
        changePage={changePage}
        linkitems={pages}
      ></NavBar>
    </>
  );
}

export default App;
