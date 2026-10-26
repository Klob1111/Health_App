import BackButton from "./components/BackButton";

const FoodMod = ({ toModMenu, maincolor }) => {
  const changeAccColor = context.changeAccColor;

  changeAccColor(maincolor);

  return (
    <div className="w-100 h-100" style={{ backgroundColor: maincolor }}>
      <BackButton toModMenu={toModMenu} />
    </div>
  );
};

export default FoodMod;
