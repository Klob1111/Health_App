import { createContext, useEffect, useState } from "react";

import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import SleepBlocker from "./components/SleepBlocker";
import StreaksPage from "./pages/StreaksPage.jsx";

//context
const GlobalContext = createContext();

function App() {
  const pages = ["Home", "Streaks"];

  //global states
  const [activepage, changePageState] = useState(pages[0]);
  const [currentmodview, setModView] = useState("Menu");
  const [accentcolor, changeAccColor] = useState("white");
  const [sleeplock, setSleepLock] = useState(() => {
    const lock = localStorage.getItem("sleepLock");
    return lock !== null ? lock === "true" : false;
  });
  const [usedsleeptime, setUsedSleepTime] = useState(20); //used to tell the sleep blocker how long to wait, set when the sleep button is clickes

  //streaks
  const [streaks, updateStreaks] = useState(() => {
    const og = localStorage.getItem("streaks");
    if (og !== null) {
      return JSON.parse(og);
    }

    return {
      Sleep: 1,
      // Food: 12,
      // Exercise: 3,
    };
  });

  const getStreakTotal = () => {
    let total = 0;
    Object.values(streaks).forEach((val) => {
      total += val;
    });
    return total;
  };

  //modules
  const [modules, updateModules] = useState(() => {
    const og = localStorage.getItem("modules");
    if (og !== null) {
      return JSON.parse(og);
    }

    return {
      Number: {
        color: "black",
        color2: "gray",
        canenter: false,
        value: getStreakTotal(),
      },
      Sleep: {
        color: "var(--sleep-color)",
        color2: "var(--sleep-color-2)",
        canenter: true,
        multi: -1,
      },
      // Food: {
      //   color: "var(--food-color)",
      //   color2: "var(--food-color-2)",
      //   canenter: true,
      //   multi: 1,
      // },
      // Exercise: {
      //   color: "var(--exercise-color)",
      //   color2: "var(--exercise-color-2)",
      //   canenter: true,
      //   multi: 1,
      // },
      Final: { color: "black", color2: "gray", canenter: false },
    };
  });

  const changePage = (state) => {
    changePageState(state);
  };

  //localstorage updates
  useEffect(() => {
    localStorage.setItem("modules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem("streaks", JSON.stringify(streaks));

    //change base value
    updateModules((prev) => ({
      ...prev,
      Number: { ...prev.Number, value: getStreakTotal() },
    }));
  }, [streaks]);

  useEffect(() => {
    localStorage.setItem("sleepLock", sleeplock);
  }, [sleeplock]);

  //remove timer when lock isn't on
  if (!sleeplock) {
    localStorage.removeItem("endTime");
  }

  //use sleep blocker
  if (sleeplock) {
    return (
      <GlobalContext.Provider
        value={{ setSleepLock, usedsleeptime, updateStreaks }}
      >
        <SleepBlocker></SleepBlocker>
      </GlobalContext.Provider>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        activepage,
        changePageState,
        modules,
        updateModules,
        streaks,
        updateStreaks,
        getStreakTotal,
        currentmodview,
        setModView,
        accentcolor,
        changeAccColor,
        sleeplock,
        setSleepLock,
        setUsedSleepTime,
      }}
    >
      <div
        className="container-flud p-0"
        style={{ height: "calc(100vh - 60px)", minHeight: "600px" }}
      >
        {/* stage */}
        {activepage == "Home" && <HomePage />}
        {activepage == "Streaks" && <StreaksPage />}
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
