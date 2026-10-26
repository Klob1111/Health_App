import { useContext, useState } from "react";
import { GlobalContext } from "../App";
import Timer from "./Timer";

const SleepBlocker = () => {
  const context = useContext(GlobalContext);
  const setSleepLock = context.setSleepLock;
  const sleeptime = context.usedsleeptime;
  const updateStreaks = context.updateStreaks;
  const sleepforgiveness = 60 * 30; //how many seconds you can be off wake time to not loose the streak
  const [sleepdone, changeSleepDone] = useState(false);
  const [overslept, changeOverSlept] = useState(false);
  const [showpopup, changeShowPopup] = useState(false);

  //DEBUG
  const [faketimer, changeFakeTimer] = useState(false);

  const sleepgood = sleepdone && !overslept;

  return (
    <div
      className="w-100 h-100 position-absolute bg-dark-subtle"
      style={{ color: "#3d3d3d" }}
    >
      {showpopup && (
        <Popup
          onClose={() => {
            updateStreaks((prev) => ({
              ...prev,
              Sleep: 1,
            }));
            setSleepLock(false);
          }}
          clear={() => changeShowPopup(false)}
        />
      )}

      <div className="h-100 d-flex flex-column justify-content-center">
        <div className="container fs-1 text-center">
          {overslept
            ? "You overslept! Streak lost..."
            : sleepdone
              ? "Time to wake up!"
              : `You're in sleep mode`}
        </div>
        <div className="fs-1 text-center">
          {faketimer && (
            <>
              {!sleepdone && (
                <Timer
                  initial={5}
                  onEnd={() => {
                    changeSleepDone(true);
                    changeShowPopup(false);
                  }}
                  storagekey={"Sleepcountdownfake"}
                ></Timer>
              )}
              {sleepdone && (
                <Timer
                  initial={8}
                  onEnd={() => {
                    changeOverSlept(true);
                  }}
                  storagekey={"Sleepcountupfake"}
                ></Timer>
              )}
            </>
          )}

          {!faketimer && (
            <>
              {!sleepdone && (
                <Timer
                  initial={sleeptime}
                  onEnd={() => {
                    changeSleepDone(true);
                    changeShowPopup(false);
                  }}
                  storagekey={"Sleepcountdown"}
                ></Timer>
              )}
              {sleepdone && (
                <Timer
                  initial={sleepforgiveness}
                  onEnd={() => {
                    changeOverSlept(true);
                  }}
                  storagekey={"Sleepcountup"}
                ></Timer>
              )}
            </>
          )}

          <button
            className="btn fs-1 bg-dark no-hover-color"
            onClick={() => {
              //won't show popup if you're late
              if (!sleepdone) {
                changeShowPopup(true);
              } else {
                updateStreaks((prev) => ({
                  ...prev,
                  Sleep: sleepgood ? prev.Sleep + 1 : 1,
                }));
                setSleepLock(false);
              }
            }}
          >
            {sleepdone ? "Wake up" : "bypass"}
          </button>
          {/* Skip night button */}
          <br></br>
          <button
            className="btn fs-1 mt-3 bg-dark no-hover-color"
            onClick={() => {
              changeFakeTimer((prev) => {
                return !prev;
              });
            }}
          >
            {faketimer ? "Slow down time" : "Speed up time (dev)"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Popup = ({ onClose, clear }) => {
  return (
    <div
      className="vw-100 vh-100 position-absolute "
      style={{ backgroundColor: "rgba(255, 255, 255, 0.25)", color: "#f1f0f0" }}
    >
      <div
        className="h-50 rounded bg-dark-subtle position-absolute start-50 top-50 translate-middle d-flex flex-column align-items-center justify-content-center"
        style={{ minWidth: "30%" }}
      >
        <h2
          className="color-white text-center fw-normal"
          style={{ maxWidth: "50%" }}
        >
          Waking up now will end your streak. Are you sure?
        </h2>
        <button
          className="btn fs-2 mt-3 bg-dark no-hover-color"
          onClick={onClose}
        >
          I'm sure
        </button>
        <button
          className="btn fs-2 mt-3 bg-dark no-hover-color"
          onClick={clear}
        >
          Take me back
        </button>
      </div>
    </div>
  );
};

export default SleepBlocker;
