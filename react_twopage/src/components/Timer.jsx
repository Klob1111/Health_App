import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../App";

const Timer = ({ initial, onEnd, storagekey }) => {
  //inital time is in seconds
  const [endtime, setEndTime] = useState(() => {
    const end = localStorage.getItem("endTime" + storagekey);
    return end !== null ? Math.max(0, Number(end)) : 0;
  });
  //init to infinity so it doesn't end instantly
  const [timeleft, setTimeLeft] = useState(Math.abs(endtime - Date.now()));
  const setSleepLock = useContext(GlobalContext).setSleepLock;

  const formatTime = (currenttime) => {
    const sectime = Math.ceil(currenttime / 1000);
    let secs = sectime % 60;
    let mins = Math.floor(sectime / 60) % 60;
    let hrs = Math.floor(sectime / 3600);

    if (secs < 10) {
      secs = "0" + secs;
    }

    if (mins < 10) {
      mins = "0" + mins;
    }

    return hrs + ":" + mins + ":" + secs;
  };

  //set end time and interval
  useEffect(() => {
    //init end time
    let end = endtime;
    if (end === 0) {
      end = Date.now() + initial * 1000;
      setEndTime(end);

      localStorage.setItem("endTime" + storagekey, end);
    }

    const getTimeLeft = () => {
      setTimeLeft(end - Date.now());
    };

    getTimeLeft();
    const interval = setInterval(getTimeLeft, 100);

    return () => {
      clearInterval(interval);
      localStorage.removeItem("endTime" + storagekey);
    };
  }, []);

  //check if time is 0 when it changes
  useEffect(() => {
    if (timeleft <= 0) {
      onEnd();
    }
  }, [timeleft]);

  return <h1>{timeleft > 0 ? formatTime(timeleft) : "0:00:00"}</h1>;
};

export default Timer;
