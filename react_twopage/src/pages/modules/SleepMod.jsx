import { useContext } from "react";
import { GlobalContext } from "../../App.jsx";

import BackButton from "./components/BackButton";

const SleepMod = ({ toModMenu, maincolor }) => {
  const setSleepLock = useContext(GlobalContext).setSleepLock;
  return (
    <div className='w-100 h-100' style={{ backgroundColor: maincolor }}>
      <BackButton toModMenu={toModMenu} />

      <div className='h-100 d-flex flex-column justify-content-center'>
        <header className='position-absolute container-fluid top-0 p-4'>
          <h1 className='container text-center'>My Sleep</h1>
        </header>

        <div className='container text-center'>
          <h1> sleep </h1>
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

export default SleepMod;
