import { useContext, useState } from "react";
import { GlobalContext } from "../App";
import Timer from "./Timer";

const SleepBlocker = () => {
  const context = useContext(GlobalContext);
  const setSleepLock = context.setSleepLock;
  const sleeptime = context.usedsleeptime;
  const updateStreaks = context.updateStreaks;
  const [sleepdone, changeSleepDone] = useState(false);

  return (
    <div
      className="w-100 h-100 position-absolute bg-dark-subtle"
      style={{ color: "#3d3d3d" }}
    >
      <div className="h-100 d-flex flex-column justify-content-center">
        <div className="container fs-1 text-center">
          {sleepdone ? "Time to wake up!" : `You're in sleep mode`}
        </div>

        <div className="fs-1 text-center">
          <Timer
            initial={10}
            onEnd={() => {
              changeSleepDone(true);
            }}
          ></Timer>
          <button
            className="btn fs-1 bg-dark no-hover-color"
            onClick={() => {
              updateStreaks((prev) => ({
                ...prev,
                Sleep: sleepdone ? prev.Sleep + 1 : 1,
              }));
              setSleepLock(false);
            }}
          >
            {sleepdone ? "Wake up" : "bypass"}
          </button>
          {/* Skip night button */}
          <br></br>
          <button
            className="btn fs-1 mt-3 bg-dark no-hover-color"
            onClick={() => {
              updateStreaks((prev) => ({
                ...prev,
                Sleep: prev.Sleep + 1,
              }));
              setSleepLock(false);
            }}
          >
            Wake up on time (dev)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepBlocker;
