import { useState } from "react";
import ModMenu from "./modules/ModMenu";
import SleepMod from "./modules/SleepMod";
import BackButton from "./modules/components/BackButton";

const HomePage = () => {
  const modules = {
    Number: "black",
    Sleep: "#2647c9",
    Exercise: "#d24545ff",
    Nutition: "rgb(58, 127, 55)",
    Final: "black",
  };

  const [currentmodview, setmodveiw] = useState("Menu");

  const enterModule = (name) => {
    setmodveiw(name);
  };

  const leaveModule = () => {
    setmodveiw("Menu");
  };

  let out = (
    <>
      <h1 className="container text-center mt-5">Page not found /:</h1>
      <BackButton toModMenu={leaveModule} />
    </>
  );

  switch (currentmodview) {
    case "Menu":
      out = (
        <ModMenu
          modules={modules}
          enterModule={enterModule}
          currentmodview={currentmodview}
        />
      );
      break;
    case "Sleep":
      out = <SleepMod toModMenu={leaveModule} />;
      break;
  }

  return out;
};

export default HomePage;
