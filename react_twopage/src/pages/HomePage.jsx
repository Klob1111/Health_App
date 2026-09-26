import { useState } from "react";
import ModMenu from "./modules/ModMenu";

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

  let out = <h1 className='container text-center mt-5'>Page not found /:</h1>;

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
      out = <SleepMod />;
      break;
  }

  return out;
};

export default HomePage;
