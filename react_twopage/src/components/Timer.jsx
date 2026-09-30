import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";

const Timer = ({ initial }) => {
  const setSleepLock = useContext(GlobalContext);
  const [timeleft, setTimeLeft] = useState(initial);

  const removeTime = () => {
    setTimeLeft((currenttime) => {
      return currenttime - 1;
    });
  };

  const formatTime = (currenttime) => {
    const mins = Math.floor(currenttime / 60);
    let secs = currenttime % 60;

    if (secs < 10) {
      secs = "0" + secs;
    }

    return mins + ":" + secs;
  };

  //use effect to avoid creating a new interval on re-render
  useEffect(() => {
    const interval = setInterval(removeTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //check if time is 0 when it changes
  useEffect(() => {
    if (timeleft == 0) {
      setSleepLock(false);
    }
  }, [timeleft]);

  return <h1>{formatTime(timeleft)}</h1>;
};

export default Timer;
