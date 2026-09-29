import { useState } from "react";
import ModMenu from "./modules/ModMenu";
import SleepMod from "./modules/SleepMod";
import BackButton from "./modules/components/BackButton";
import ExerciseMod from "./modules/ExerciseMod";
import FoodMod from "./modules/ExerciseMod";

const HomePage = ({ changeAccColor }) => {
  const modules = {
    Number: "black",
    Sleep: "var(--sleep-color)",
    Exercise: "var(--exercise-color)",
    Food: "var(--food-color)",
    Final: "black",
  };

  const [currentmodview, setmodveiw] = useState("Menu");

  const enterModule = (name) => {
    changeAccColor(modules[name]);
    setmodveiw(name);
  };

  const leaveModule = () => {
    setmodveiw("Menu");
    changeAccColor("white");
  };

  let out = (
    <>
      <h1 className='container text-center mt-5'>Page not found /:</h1>
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
      out = <SleepMod toModMenu={leaveModule} maincolor={modules["Sleep"]} />;
      break;
    case "Exercise":
      out = (
        <ExerciseMod toModMenu={leaveModule} maincolor={modules["Exercise"]} />
      );
      break;
    case "Food":
      out = <FoodMod toModMenu={leaveModule} maincolor={modules["Food"]} />;
      break;
  }

  return out;
};

export default HomePage;
