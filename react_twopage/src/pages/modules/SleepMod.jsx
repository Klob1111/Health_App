import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../App.jsx";
import { clamp } from "../../utils.jsx";

import BackButton from "./components/BackButton";
import Slider from "./components/slider";

const SleepMod = ({ toModMenu, maincolor }) => {
  const modules = useContext(GlobalContext).modules;
  const updateModules = useContext(GlobalContext).updateModules;
  const setSleepLock = useContext(GlobalContext).setSleepLock;
  const setUsedSleepTime = useContext(GlobalContext).setUsedSleepTime;

  //find already-set values
  const [sleepgoal, setSleepGoal] = useState(() => {
    const og = localStorage.getItem("sleepGoal");
    return og !== null ? Number(og) : 8;
  });
  const [sleepstart, setSleepStart] = useState(() => {
    const og = localStorage.getItem("sleepStart");
    return og !== null ? Number(og) : 43;
  });
  const [sleepend, setSleepEnd] = useState(() => {
    const og = localStorage.getItem("sleepEnd");
    return og !== null ? Number(og) : 27;
  });

  const excpectedsleep = sleepend / 4 + 12 - sleepstart / 4;
  const badsleep = excpectedsleep < sleepgoal;

  //output = 1.25x, decresing for every 15 mins away from the goal (goal to 30 mins after) it is, + the 0.1x times the number of days it's been consisant, + a bonus depending on how long it's been since a shcedule change, capping at 2 weeks + challenge bonus (how leniant it is with when you go sleep)
  const amountscore = clamp(
    1.5 -
      Math.max(
        sleepgoal - excpectedsleep,
        0,
        excpectedsleep - sleepgoal - 0.5
      ) /
        2,
    0.25,
    1.5
  );

  const multioutput = amountscore;

  const getOutputText = () => {
    return (
      <p className='mb-0'>
        Sleep target deviation ({amountscore}x) + streak
        <br /> = <b>{multioutput}x total multiplier</b>
      </p>
    );
  };

  useEffect(() => {
    updateModules((prev) => ({
      ...prev,
      Sleep: { ...prev.Sleep, multi: multioutput },
    }));
  }, [multioutput]);

  useEffect(() => {
    if (excpectedsleep > 12) {
      setSleepEnd((s) => s - 1);
    }

    localStorage.setItem("sleepStart", sleepstart);
  }, [sleepstart]);

  useEffect(() => {
    if (excpectedsleep > 12) {
      setSleepStart((s) => s + 1);
    }

    localStorage.setItem("sleepEnd", sleepend);
  }, [sleepend]);

  useEffect(() => {
    localStorage.setItem("sleepGoal", sleepgoal);
  }, [sleepgoal]);

  return (
    <div className='w-100 h-100' style={{ backgroundColor: maincolor }}>
      <BackButton toModMenu={toModMenu} />

      <div className='h-100 d-flex flex-column justify-content-center py-4'>
        <header className='position-absolute container-fluid top-0 p-4'>
          <h1 className='container text-center fw-bold'>My Sleep</h1>
        </header>

        <div className='w-100 mb-4 d-flex justify-content-around'>
          <div
            className='bg-dark rounded-4 d-flex flex-column p-3'
            style={{ width: "25%" }}
          >
            <div className='flex-fill'>
              <div className='container text-center fs-2 fw-bold'>
                Target Sleep:
              </div>
              <div
                className='container text-center mt-2 position-relative'
                style={{ fontSize: "65px" }}
              >
                {formatSleephrs(sleepgoal)}
                {(sleepgoal < 8 || sleepgoal > 10) && (
                  <i
                    className={
                      "bi bi-exclamation-circle fs-3 translate-middle top-50 position-absolute"
                    }
                    style={{ right: "3%" }}
                  />
                )}
              </div>

              {/*goal change buttons */}
              <div className='w-75 container text-center d-flex justify-content-evenly mt-2'>
                <button
                  className='border-0 p-2 rounded-2 fs-4'
                  style={{ backgroundColor: maincolor, width: "35%" }}
                  onClick={() =>
                    updateTargetSleep(-0.25, sleepgoal, setSleepGoal)
                  }
                >
                  -
                </button>
                <button
                  className='border-0 p-2 rounded-2 fs-4'
                  style={{ backgroundColor: maincolor, width: "35%" }}
                  onClick={() =>
                    updateTargetSleep(0.25, sleepgoal, setSleepGoal)
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className='flex-fill '>
              <div className='container text-center fs-2 fw-bold'>
                Expected Sleep:
              </div>

              <div
                className='container text-center position-relative'
                style={{
                  fontSize: "65px",
                  color: badsleep ? "red" : "",
                }}
              >
                {formatSleephrs(excpectedsleep)}
                {badsleep && (
                  <p className='fs-5 position-absolute p-3 start-50 translate-middle'>
                    below target
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* slider section */}
          <div
            className='bg-dark rounded-4 p-3 d-flex flex-column'
            style={{ width: "65%" }}
          >
            <div className='container text-center fs-2 mb-2 fw-bold'>
              Sleep Shedule
            </div>

            <div className='flex-grow-1 container-fluid d-flex flex-column align-items-center justify-content-center p-0 position-relative'>
              <Slider
                val={sleepstart}
                valChange={setSleepStart}
                slidersteps={47}
                slidermaxlength={800}
                sliderwidth={50}
                maincol={maincolor}
                bgcol={"var(--bs-secondary-bg)"}
                reversed
              ></Slider>
              <div className='height-0 text-center my-4'>
                <p className='fs-3 z-2 m-0'>
                  {formatSleeptime((sleepstart + 1) / 4, true)}
                </p>
                <p className='m-0'>to</p>
                <p className='fs-3 z-2 m-0'>
                  {formatSleeptime((sleepend + 1) / 4, false)}
                </p>
              </div>
              <Slider
                val={sleepend}
                valChange={setSleepEnd}
                slidersteps={47}
                slidermaxlength={800}
                sliderwidth={50}
                maincol={maincolor}
                bgcol={"var(--bs-secondary-bg)"}
              ></Slider>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className='text-center d-flex justify-content-center px-3'>
          <div className='bg-dark-subtle rounded-4 px-3 mx-3 flex-grow-0 d-flex align-items-center'>
            <h1 className='text-center fw-bold px-3'>Output:</h1>
            <div className='flex-grow-1 px-3 py-2 fs-3 d-flex align-items-center'>
              {getOutputText()}
            </div>
          </div>
          <button
            className='btn fs-1 mx-3 bg-dark-subtle'
            onClick={() => {
              setUsedSleepTime(excpectedsleep * 3600);
              setSleepLock(true);
              toModMenu();
            }}
          >
            Go to sleep!
          </button>
        </div>
      </div>
    </div>
  );
};

const updateTargetSleep = (hours, goal, changeGoal) => {
  let finalhours = Math.min(Math.max(goal + hours, 0), 12);
  changeGoal(finalhours);
};

const formatSleephrs = (hours) => {
  const hrs = Math.floor(hours);
  let mins = Math.floor((hours - Math.floor(hours)) * 60);
  if (mins == 0) {
    mins = "00";
  }

  return hrs + ":" + mins + ":00";
};

const formatSleeptime = (hours, ispm) => {
  let hrs = Math.floor(hours);
  let mins = Math.floor((hours - Math.floor(hours)) * 60);

  if (mins == 0) {
    mins = "00";
  }
  if (hrs == 0) {
    hrs = "12";
  } else if (hrs == 12) {
    ispm = !ispm;
  }

  const suffix = ispm ? "PM" : "AM";

  return hrs + ":" + mins + suffix;
};

export default SleepMod;
