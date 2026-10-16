import { useContext, useState } from "react";
import { GlobalContext } from "../../App.jsx";

import BackButton from "./components/BackButton";
import Slider from "./components/Slider";

const SleepMod = ({ toModMenu, maincolor }) => {
  const setSleepLock = useContext(GlobalContext).setSleepLock;
  const [sleepgoal, setSleepGoal] = useState(8);
  const [sleepexpect, setSleepExpect] = useState(8);
  const [sleepstart, setSleepStart] = useState(2);

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
                {formatTargetSleep(sleepgoal)}
                {sleepgoal < 8 && (
                  <i
                    className={
                      "bi bi-exclamation-circle fs-3 translate-middle top-50 position-absolute"
                    }
                    style={{ right: "5%" }}
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
              {sleepgoal <= sleepexpect ? (
                <div
                  className='container text-center'
                  style={{ fontSize: "65px" }}
                >
                  {formatTargetSleep(sleepexpect)}
                </div>
              ) : (
                <div
                  className='container text-center position-relative'
                  style={{ fontSize: "65px", color: "red" }}
                >
                  {formatTargetSleep(sleepexpect)}
                  <p className='fs-5 position-absolute p-3 start-50 translate-middle'>
                    below target
                  </p>
                </div>
              )}
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

            <div className='flex-grow-1 container-fluid d-flex flex-column align-items-center justify-content-around p-0'>
              <Slider
                val={sleepstart}
                valChange={setSleepStart}
                slidersteps={100}
                slidermaxlength={800}
                sliderwidth={50}
              ></Slider>
              <Slider
                val={sleepstart}
                valChange={setSleepStart}
                slidersteps={100}
                slidermaxlength={800}
                sliderwidth={50}
              ></Slider>
            </div>
          </div>
        </div>

        {/* sleep button */}
        <div className='container text-center'>
          <button
            className='btn fs-1 bg-dark-subtle'
            onClick={() => {
              setSleepLock(true);
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

const formatTargetSleep = (hours) => {
  const hrs = Math.floor(hours);
  let mins = Math.floor((hours - Math.floor(hours)) * 60);
  if (mins == 0) {
    mins = "00";
  }
  return hrs + ":" + mins + ":" + "00";
};

export default SleepMod;
