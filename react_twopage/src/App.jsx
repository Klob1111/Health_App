import { createContext, useState } from "react";

import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SleepBlocker from "./components/SleepBlocker";

//context
const GlobalContext = createContext();

function App() {
  const pages = ["Home", "Settings"];

  //global states
  const [activepage, changePageState] = useState(pages[0]);
  const [accentcolor, changeAccColor] = useState("white");
  const [sleeplock, setSleepLock] = useState(false);
  const [usedsleeptime, setUsedSleepTime] = useState(20); //used to tell the sleep blocker how long to wait, set when the sleep button is clickes

  const changePage = (state) => {
    changePageState(state);
    changeAccColor("white");
  };

  //use sleep blocker
  if (sleeplock) {
    return (
      <GlobalContext.Provider value={{ setSleepLock, usedsleeptime }}>
        <SleepBlocker></SleepBlocker>
      </GlobalContext.Provider>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        activepage,
        changePageState,
        accentcolor,
        changeAccColor,
        sleeplock,
        setSleepLock,
        setUsedSleepTime,
      }}
    >
      <div
        className='container-flud p-0'
        style={{ height: "calc(100vh - 60px)", minHeight: "600px" }}
      >
        {/* stage */}
        {activepage == "Home" && <HomePage changeAccColor={changeAccColor} />}
      </div>

      <NavBar
        activelink={activepage}
        changePage={changePage}
        linkitems={pages}
        accentcolor={accentcolor}
      ></NavBar>
    </GlobalContext.Provider>
  );
}

export { GlobalContext };
export default App;
