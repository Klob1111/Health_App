import { useContext, useState } from "react";
import { GlobalContext } from "../App";
import Timer from "./Timer";

const SleepBlocker = () => {
  const context = useContext(GlobalContext);
  const setSleepLock = context.setSleepLock;
  const sleeptime = context.usedsleeptime;
  const updateStreaks = context.updateStreaks;
  const [message, setMessage] = useState(`You're in Sleep Mode`);

  return (
    <div
      className="w-100 h-100 position-absolute bg-dark-subtle"
      style={{ color: "#3d3d3d" }}
    >
      <div className="h-100 d-flex flex-column justify-content-center">
        <div className="container fs-1 text-center">{message}</div>

        <div className="fs-1 text-center">
          <Timer
            initial={10}
            onEnd={() => {
              setMessage("Time to wake up!");
            }}
          ></Timer>
          <button
            className="btn fs-1 bg-dark no-hover-color"
            onClick={() => setSleepLock(false)}
          >
            bypass
          </button>
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
