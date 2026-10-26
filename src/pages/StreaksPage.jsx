import { useContext } from "react";
import { GlobalContext } from "../App";

const StreaksPage = () => {
  const context = useContext(GlobalContext);
  const modules = context.modules;
  const streaks = context.streaks;
  const getStreakTotal = context.getStreakTotal;
  const changeAccColor = context.changeAccColor;

  changeAccColor("white");

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center">
        <div className="container fs-1 p-3 m-4 text-center bg-black rounded-4 position-relative">
          My Streaks
          <div
            className="position-absolute top-50 translate-middle"
            style={{ right: "0" }}
          >
            Total: {getStreakTotal()}
          </div>
        </div>
        {Object.keys(modules).map((name) => {
          if (!modules[name].canenter) return;
          return (
            <div
              className="m-3 d-flex justify-content-between align-items-center rounded-4 overflow-hidden position-relative"
              style={{ width: "90%", backgroundColor: modules[name].color }}
            >
              <div
                className="position-absolute"
                style={{
                  height: "100%",
                  width: "20%",
                  background: `linear-gradient(90deg, ${modules[name].color2} 20%, ${modules[name].color})`,
                }}
              ></div>
              <h2
                className="fw-normal m-0 p-5 z-1"
                style={{
                  fontSize: "50px",
                }}
              >
                {name}
              </h2>
              <h2
                className="fw-normal m-0 p-5 z-1"
                style={{
                  fontSize: "40px",
                }}
              >
                Total streak: {streaks[name]}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default StreaksPage;
