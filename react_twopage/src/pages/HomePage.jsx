import { useContext, useState } from "react";
import { GlobalContext } from "../App.jsx";

import ModMenu from "./modules/ModMenu";
import SleepMod from "./modules/SleepMod";
import BackButton from "./modules/components/BackButton";
import ExerciseMod from "./modules/ExerciseMod";
import FoodMod from "./modules/ExerciseMod";

const HomePage = () => {
  const modules = useContext(GlobalContext).modules;
  const currentmodview = useContext(GlobalContext).currentmodview;
  const setModVeiw = useContext(GlobalContext).setModView;

  const enterModule = (name) => {
    if (!modules[name].canenter) {
      return;
    }

    setModVeiw(name);
  };

  const leaveModule = () => {
    setModVeiw("Menu");
  };

  let out = (
    <>
      <h1 className="container text-center mt-5">Page not found /:</h1>
      <BackButton toModMenu={leaveModule} />
    </>
  );

  switch (currentmodview) {
    case "Menu":
      out = <ModMenu modules={modules} enterModule={enterModule} />;
      break;
    case "Sleep":
      out = (
        <SleepMod toModMenu={leaveModule} maincolor={modules["Sleep"].color} />
      );
      break;
    // case "Exercise":
    //   out = (
    //     <ExerciseMod toModMenu={leaveModule} maincolor={modules["Exercise"]} />
    //   );
    //   break;
    // case "Food":
    //   out = <FoodMod toModMenu={leaveModule} maincolor={modules["Food"]} />;
    //   break;
  }

  return out;
};

export default HomePage;
