import { useContext } from "react";
import { GlobalContext } from "../App";
import Timer from "./Timer";

const SleepBlocker = () => {
  const setSleepLock = useContext(GlobalContext);

  return (
    <div
      className='w-100 h-100 position-absolute bg-dark-subtle'
      style={{ color: "#3d3d3d" }}
    >
      <div className='h-100 d-flex flex-column justify-content-center'>
        <div className='container fs-1 text-center'>You're in Sleep Mode</div>

        <div className='fs-1 text-center'>
          <Timer initial='90'></Timer>
          <button
            className='btn fs-1 bg-dark no-hover-color'
            onClick={() => setSleepLock(false)}
          >
            bypass
          </button>
        </div>
      </div>
    </div>
  );
};

export default SleepBlocker;
