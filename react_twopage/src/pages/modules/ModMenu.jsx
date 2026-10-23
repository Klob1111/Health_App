import React, { useCallback, useContext } from "react";
import { getScore } from "../../utils";
import { GlobalContext } from "../../App";

const ModMenu = ({ modules, enterModule }) => {
  const moduleboiler =
    "position-relative container-fluid text-center rounded-5 p-3 fs-2 border-0 ";
  const context = useContext(GlobalContext);
  const changeAccColor = context.changeAccColor;

  changeAccColor("white");

  return (
    <div
      style={{ height: "100%" }}
      className="container-fluid d-flex flex-column justify-content-center p-0"
    >
      <div
        className="position-relative container bg-dark-subtle rounded-5 h-75 p-3 overflow-y-scroll"
        style={{ maxWidth: "350px" }}
      >
        {/* modules */}
        {Object.keys(modules).map((name) => {
          let displaytext = name + " - " + modules[name].multi + "x";

          switch (name) {
            case "Final":
              displaytext = getScore(modules);
              break;
            case "Number":
              displaytext = modules.Number.value;
              break;
          }

          return (
            <React.Fragment key={name}>
              <ModuleDisplay
                name={name}
                text={displaytext}
                color={modules[name].color}
                boiler={moduleboiler}
                onClick={enterModule}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const ModuleDisplay = ({ name, text, color, boiler, onClick }) => {
  return (
    <>
      <button
        className={boiler + "mt-3 z-1"}
        style={{ backgroundColor: color }}
        onClick={() => onClick(name)}
      >
        {text}
      </button>

      {/* connecting bar */}
      {name != "Number" && (
        <div className="position-relative z-0" style={{ height: 0 }}>
          <div
            className="bg-light position-relative start-50 translate-middle-x"
            style={{ height: "30px", width: "5px", top: "-105px" }}
          ></div>
        </div>
      )}
    </>
  );
};

export default ModMenu;
